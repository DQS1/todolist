import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import {
  ButtonContainer,
  ContentContainer,
  DomainName,
  HeaderContainer,
  ProviderName,
  RowWrapper,
  TitleHeader,
  WrapperContainer,
  IconWrapper,
  ContainerCreate,
  EditCheContainer,
  ColStyle,
  RowStyle,
} from "./CertificatesStyled";
import {
  CloseOutlined,
  FormOutlined,
  TagFilled,
  CheckCircleFilled,
  InboxOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { useState } from "react";
import moment from "moment";

import FieldData from "./Certifidata/Field.json";
import LevelData from "./Certifidata/Level.json";

const { Dragger } = Upload;
const { confirm } = Modal;
const formName = "Certifications";

const dateFormat = "MM/DD/YYYY";

export const formatDate = (date: string | undefined) => {
  if (!date) return "";
  return moment(date).format(dateFormat);
};

function CertificatesPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [momentTest, setMomentTest] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const data = [
    {
      nameCert: "11dasd",
      provider: "HCM",
      field: "AI & Machine Learning",
      Level: "Basic",
      licenseNumber: "csdc",
      grad: "fsdsfsd",
      issuedDate: moment(),
    },
  ];

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    maxCount: 1,
    listType: "picture",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > moment().endOf("day");
  };

  const ModalEdit = () => {
    return isModalOpen ? (
      <Modal
        title={isEdit ? "Edit Certifications" : "Create Certifications"}
        open={isModalOpen}
        width={800}
        maskClosable={false}
        onCancel={handleCancel}
        footer={
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 12,
            }}
          >
            <Button
              size="middle"
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
              form={formName}
            >
              Submit
            </Button>
          </Form.Item>
        }
        style={{ top: 30 }}
      >
        <EditCheContainer>
          <Form
            name={formName}
            form={form}
            layout="vertical"
            onFinish={(value) => {
              handleSubmit(value);
            }}
          >
            <Form.Item
              label="Certification Name"
              name="CertificationName"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Enter Certification Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Provider"
              name="Provider"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Enter Provider",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Field"
              name="Field"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Select field",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                allowClear
                options={FieldData}
                showSearch
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item label="Level" name="Level">
              <Select
                style={{ width: "100%" }}
                allowClear
                options={LevelData}
                showSearch
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>
            <RowStyle>
              <ColStyle>
                <Form.Item label="License Number" name="LicenseNumber">
                  <Input />
                </Form.Item>
                <Form.Item label="Grade" name="Grade">
                  <Input />
                </Form.Item>
              </ColStyle>
              <ColStyle>
                <Form.Item
                  label="Issued Date"
                  name="IssuedDate"
                  style={{ width: "100%" }}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    disabledDate={disabledDate}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Expired Date"
                  name="ExpiredDate"
                  style={{ width: "100%" }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          moment(getFieldValue("IssuedDate")).isBefore(
                            moment(value),
                            "D"
                          )
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Expired date must be after issued date!")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker format={dateFormat} style={{ width: "100%" }} />
                </Form.Item>
              </ColStyle>
            </RowStyle>
            <Form.Item name="file">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </EditCheContainer>
      </Modal>
    ) : null;
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this certificates?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmit = (value: any) => {
    console.log({ value });
    setMomentTest(value?.IssuedDate);
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleEdit = (value: any) => {
    setIsEdit(true);
    setIsModalOpen(true);
    form.setFieldsValue({
      CertificationName: "dasd",
      Provider: "fsdf",
      Field: "vsd",
      Level: "Basic",
      LicenseNumber: "vsd",
      Grade: "sdvsdv",
      IssuedDate: moment("2023-06-20"),
      ExpiredDate: moment("2023-06-21"),
      file: "",
    });
  };

  return (
    <Spin spinning={false}>
      <WrapperContainer>
        <RowWrapper>
          <HeaderContainer>
            <TitleHeader>
              {data[0].nameCert}{" "}
              <CheckCircleFilled
                style={{ fontSize: 14, color: "#2fc1a2", marginLeft: 2 }}
              />
            </TitleHeader>
            <ButtonContainer>
              <IconWrapper>
                <FormOutlined onClick={(value) => handleEdit(value)} />
              </IconWrapper>
              <IconWrapper>
                <CloseOutlined onClick={showDeleteConfirm} />
              </IconWrapper>
            </ButtonContainer>
          </HeaderContainer>
          <ContentContainer>
            <ProviderName>{data[0].provider}</ProviderName>
            <DomainName>
              <TagFilled style={{ marginRight: 6 }} />
              {data[0].field}
            </DomainName>
          </ContentContainer>
        </RowWrapper>
        <ContainerCreate>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Certifications
          </Button>
        </ContainerCreate>
      </WrapperContainer>
      {ModalEdit()}
    </Spin>
  );
}

export default CertificatesPage;
