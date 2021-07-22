import { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Input from '../Input';
import Modal from '../Modal';
import { ModalAddFoodPropos } from './interface';
import { Form } from './styles';


const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodPropos) => {
  const formRef = useRef(null);

  console.log("Entrou no modal add")

  const handleSubmit = useCallback((data) => {
    handleAddFood(data);
    setIsOpen();
  }, [handleAddFood, setIsOpen]);


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
