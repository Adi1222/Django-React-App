import React, { useState, Component } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

class CustomForm extends Component {
  handleFormSubmit = async (event, requestType, articleID) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;

    console.log(title, content);

    switch (requestType) {
      case "post":
        return axios
          .post("https://127.0.0.1:8000/api/", {
            title: title,
            content: content,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      case "put":
        return axios
          .put(`https://127.0.0.1:8000/api/${articleID}/`, {
            title: title,
            content: content,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={(event) =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <Form.Item label="Title">
            <Input name="title" placeholder="Put a Tile here" />
          </Form.Item>
          <Form.Item label="Content">
            <Input name="content" placeholder="Enter some Content" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

/*
const CustomForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const initialFormState = { title: "", content: "" };
  const [article, setAricle] = useState(initialFormState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const { name, value } = e.target;
    setAricle({ ...article, [name]: value });

    console.log(article);
  };

  return (
    <div>
      <Form
        onSubmit={(event) => {
          console.log('dfdf')
        }}
      >
        <Form.Item label="Title">
          <Input name="title" placeholder="Put a Tile here" />
        </Form.Item>
        <Form.Item label="Content">
          <Input name="content" placeholder="Enter some Content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
*/

export default CustomForm;
