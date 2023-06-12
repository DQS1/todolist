import { Button, Card, Col, List, Modal, Space } from "antd";
import Draggable from "react-draggable";
import { styled } from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  height: 100vh;
  background: url(https://raw.githubusercontent.com/cloworm/todo/master/public/images/bg-desktop-light.jpg)
    center top / 100% 300px no-repeat fixed;
`;

export const ElementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  width: 100%;
  max-width: 1068px;
  margin: 0 auto;
  margin-top: 3rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  font-size: 28px;
  justify-content: center;
  margin-bottom: 3rem;
  font-weight: 600;
  letter-spacing: 5px;
  color: #fafafa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  .content {
    flex: 1;
  }
`;

export const ListStyled = styled(List)`
  background-color: #ffffff;
  margin-top: 3rem;
`;

export const ColStyled = styled(Col)<{ type?: string }>`
  background-color: ${(props) =>
    props.type === "TODO"
      ? "#30eeff"
      : props.type === "INPROGRESS"
      ? "#ffd18f"
      : props.type === "DONE"
      ? "#54e676"
      : "#007bff"};
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
`;

export const HeaderCol = styled.div`
  box-sizing: border-box;
  color: #000;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border-bottom: 2px solid #fff;
`;

export const SpaceStyled = styled(Space)`
  margin-top: 6px;
  width: 100%;
  padding-bottom: 0.5rem;
`;

export const CardStyled = styled(Card)`
  margin: 0 4px;
`;

export const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddButton = styled(Button)`
  box-sizing: border-box;
  margin: 0 3px;
  border: none;
  width: 96%;
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const ModalStyle = styled(Modal)`
  width: 700px;
  .ant-modal-content {
    padding: 20px 24px 2px 24px;
  }
`;

export const DraggableStyled = styled(Draggable)`
  z-index: 9999;
`;

export const ContentCard = styled.div`
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleContainer = styled.div`
  flex: 1;
  max-width: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
