import { useCallback, useEffect, useState } from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodsContainer } from './styles';
export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

const Dashboard = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [editingFood, setEditingFood] = useState<FoodItem>({} as FoodItem);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetcFoods() {
      const response = await api.get<FoodItem[]>('/foods');
      setFoods(response.data);
    }
    fetcFoods();
  }, []);


  const handleAddFood = useCallback(async (food: FoodItem) => {
    try {
      const response = await api.post<FoodItem[]>('/foods', {
        ...food,
        available: true,
      });

      setFoods(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);



  const handleUpdateFood = useCallback(async (food: FoodItem) => {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  }, [editingFood, foods])

  const handleDeleteFood = useCallback(async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }, [foods])

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen])

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen])


  const handleEditFood = useCallback((food: FoodItem) => {
    setEditModalOpen(true);
    setEditingFood(food);
  }, []);



  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={(food: FoodItem) => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
}



export default Dashboard;
