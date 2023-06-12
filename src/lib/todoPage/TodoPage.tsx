import {
  CloseCircleOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  AddButton,
  CardStyled,
  ColStyled,
  ElementWrapper,
  FormContainer,
  HeaderCard,
  HeaderCol,
  HeaderContainer,
  ModalStyle,
  SpaceStyled,
  WrapperContainer,
} from "./Todostyled";

import { useState } from "react";

interface TodoList {
  id: string;
  title: string;
  content: string;
}

function TodoPage() {
  const [form] = Form.useForm();
  const [inprogressData, setInprogressData] = useState<TodoList[]>([]);
  const [data, setData] = useState<TodoList[]>([]);
  const [doneData, setDoneData] = useState<TodoList[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dataByStatus: Record<string, TodoList[]> = {
    TODO: data,
    INPROGRESS: inprogressData,
    DONE: doneData,
  };


  const handleDelete = (index: number, colName: string) => {
    switch (colName) {
      case "TODO":
        setData(
          data.filter((val, indexVal) => {
            return indexVal !== index;
          })
        );
        break;
      case "INPROGRESS":
        setInprogressData(
          inprogressData.filter((val, indexVal) => {
            return indexVal !== index;
          })
        );
        break;
      case "DONE":
        setDoneData(
          doneData.filter((val, indexVal) => {
            return indexVal !== index;
          })
        );
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleAdd = (value: any) => {
    setIsModalOpen(false);
    form.resetFields();
    const temp: TodoList = {
      id: value?.title,
      title: value?.title,
      content: value?.content,
    };

    const status: string = value?.status ?? {};
    const dataToUpdate: TodoList[] = dataByStatus[status] ?? data;
    const updatedData: TodoList[] =
      isEdit && currentIndex !== undefined
        ? [
            ...dataToUpdate.slice(0, currentIndex),
            temp,
            ...dataToUpdate.slice(currentIndex + 1),
          ]
        : [...dataToUpdate, temp];

    setIsEdit(false);
    switch (status) {
      case "TODO":
        setData(updatedData);
        break;
      case "INPROGRESS":
        setInprogressData(updatedData);
        break;
      case "DONE":
        setDoneData(updatedData);
        break;
      default:
        setData(updatedData);
    }
  };

  const handleEnd = (result: any) => {
    const { source, destination } = result;
    if (!result.destination) return;
    const currentCategoryId = source.droppableId;
    const dropedCategoryId = destination.droppableId;
    if (currentCategoryId === dropedCategoryId) {
      let newData;
      switch (currentCategoryId) {
        case "TODO":
          newData = reoderArray(data, result);
          setData(newData);
          break;
        case "INPROGRESS":
          newData = reoderArray(inprogressData, result);
          setInprogressData(newData);
          break;
        case "DONE":
          newData = reoderArray(doneData, result);
          setDoneData(newData);
          break;
        default:
          break;
      }
    }

    if (currentCategoryId !== dropedCategoryId) {
      let selectedItem: any;
      let dataToUpdate: any;
      let setDataToUpdate: any;
      switch (currentCategoryId) {
        case "TODO":
          selectedItem = data[source.index];
          dataToUpdate = data;
          setDataToUpdate = setData;
          break;
        case "INPROGRESS":
          selectedItem = inprogressData[source.index];
          dataToUpdate = inprogressData;
          setDataToUpdate = setInprogressData;
          break;
        case "DONE":
          selectedItem = doneData[source.index];
          dataToUpdate = doneData;
          setDataToUpdate = setDoneData;
          break;
        default:
          break;
      }
      setDataToUpdate(
        dataToUpdate.filter((val: TodoList, indexVal: any) => {
          return indexVal !== source.index;
        })
      );
      switch (dropedCategoryId) {
        case "TODO":
          setData(
            insertItemToArray(data, selectedItem, result.destination.index)
          );
          break;
        case "INPROGRESS":
          setInprogressData(
            insertItemToArray(
              inprogressData,
              selectedItem,
              result.destination.index
            )
          );
          break;
        case "DONE":
          setDoneData(
            insertItemToArray(doneData, selectedItem, result.destination.index)
          );
          break;
        default:
          break;
      }
    }
  };

  const reoderArray = (arrayName: TodoList[], result: any) => {
    const reorderedItem = arrayName[result.source.index];

    const filteredItems = Array.from(arrayName).filter(
      (i) => i.id !== reorderedItem.id
    );
    filteredItems.splice(result.destination.index, 0, reorderedItem);
    return filteredItems;
  };

  const insertItemToArray = (
    arrayName: TodoList[],
    newItem: TodoList,
    index: number
  ) => {
    const items = Array.from(arrayName);
    items.splice(index, 0, newItem);
    return items;
  };

  const handleEdit = (val: TodoList, indexVal: number, colName: string) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setCurrentIndex(indexVal);
    form.setFieldsValue({
      title: val?.title,
      content: val?.content,
      status: colName,
    });
    ModelEdit();
  };

  const ModelEdit = () => {
    return isModalOpen ? (
      <ModalStyle
        title={isEdit ? "Edit Task" : "Create Task"}
        open={isModalOpen}
        width={560}
        footer={null}
        onCancel={handleCancel}
      >
        <FormContainer>
          <Form
            form={form}
            onFinish={(value) => {
              handleAdd(value);
            }}
          >
            <Form.Item
              name="title"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Please input Title!",
                },
              ]}
            >
              <Input style={{ width: "50%" }} placeholder="Input Title" />
            </Form.Item>
            <Form.Item
              name="content"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Please input Content!",
                },
              ]}
            >
              <Input.TextArea
                style={{ height: 100, resize: "none" }}
                placeholder="Input Content"
                autoSize={{ minRows: 4, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item name="status" hidden>
              <Input />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ width: 80, marginRight: 10, background: "#9f9f9f" }}
                size="middle"
                type="primary"
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                  setIsModalOpen(false);
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                style={{ width: 80 }}
                size="middle"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </ModalStyle>
    ) : null;
  };

  return (
    <WrapperContainer>
      <ElementWrapper>
        <HeaderContainer>TODO</HeaderContainer>
        <DragDropContext onDragEnd={handleEnd}>
          <Row wrap={true}>
            <ColStyled
              type="TODO"
              xs={{ span: 6, offset: 2 }}
              lg={{ span: 6, offset: 2 }}
            >
              <HeaderCol>TODO</HeaderCol>
              <Droppable droppableId="TODO">
                {(provided) => (
                  <SpaceStyled
                    direction="vertical"
                    size="small"
                    style={{ display: "flex" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {data.map((val, index) => {
                      return (
                        <Draggable
                          key={val?.id}
                          draggableId={val?.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <CardStyled
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={val?.id}
                              className={
                                snapshot.isDragging
                                  ? "selected"
                                  : "not-selected"
                              }
                              title={
                                <HeaderCard>
                                  {val?.title}{" "}
                                  <div>
                                    <FormOutlined
                                      onClick={() => {
                                        handleEdit(val, index, "TODO");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />{" "}
                                    <CloseCircleOutlined
                                      onClick={() => {
                                        handleDelete(index, "TODO");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />
                                  </div>
                                </HeaderCard>
                              }
                              size="small"
                            >
                              <p>{val?.content}</p>
                            </CardStyled>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </SpaceStyled>
                )}
              </Droppable>
              <AddButton
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <PlusOutlined />
              </AddButton>
            </ColStyled>
            <ColStyled
              type="INPROGRESS"
              xs={{ span: 6, offset: 1 }}
              lg={{ span: 6, offset: 1 }}
            >
              <HeaderCol>INPROGRESS</HeaderCol>
              <Droppable droppableId="INPROGRESS">
                {(provided) => (
                  <SpaceStyled
                    direction="vertical"
                    size="small"
                    style={{ display: "flex" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {inprogressData.map((val, index) => {
                      return (
                        <Draggable
                          key={val?.id}
                          draggableId={val?.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <CardStyled
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={val?.id}
                              className={
                                snapshot.isDragging
                                  ? "selected"
                                  : "not-selected"
                              }
                              title={
                                <HeaderCard>
                                  {val?.title}{" "}
                                  <div>
                                    <FormOutlined
                                      onClick={() => {
                                        handleEdit(val, index, "INPROGRESS");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />{" "}
                                    <CloseCircleOutlined
                                      onClick={() => {
                                        handleDelete(index, "INPROGRESS");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />
                                  </div>
                                </HeaderCard>
                              }
                              size="small"
                            >
                              <p>{val?.content}</p>
                            </CardStyled>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </SpaceStyled>
                )}
              </Droppable>
            </ColStyled>
            <ColStyled
              type="DONE"
              xs={{ span: 6, offset: 1 }}
              lg={{ span: 6, offset: 1 }}
            >
              <HeaderCol>DONE</HeaderCol>
              <Droppable droppableId="DONE">
                {(provided) => (
                  <SpaceStyled
                    direction="vertical"
                    size="small"
                    style={{ display: "flex" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {doneData.map((val, index) => {
                      return (
                        <Draggable
                          key={val?.id}
                          draggableId={val?.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <CardStyled
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={val?.id}
                              className={
                                snapshot.isDragging
                                  ? "selected"
                                  : "not-selected"
                              }
                              title={
                                <HeaderCard>
                                  {val?.title}{" "}
                                  <div>
                                    <FormOutlined
                                      onClick={() => {
                                        handleEdit(val, index, "DONE");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />{" "}
                                    <CloseCircleOutlined
                                      onClick={() => {
                                        handleDelete(index, "DONE");
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: 4,
                                      }}
                                    />
                                  </div>
                                </HeaderCard>
                              }
                              size="small"
                            >
                              <p>{val?.content}</p>
                            </CardStyled>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </SpaceStyled>
                )}
              </Droppable>
            </ColStyled>
          </Row>
        </DragDropContext>
      </ElementWrapper>
      {ModelEdit()}
    </WrapperContainer>
  );
}
export default TodoPage;
