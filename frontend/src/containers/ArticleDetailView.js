import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Card } from "antd";

import { makeStyles } from "@material-ui/styles";

import Articles from "../components/Article";
import CustomForm from "../components/Form";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ArticleDetail = (props) => {
  const [article, setarticle] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  //const articleID = this.props.match.params.articleID;

  const handleDelete = (event) => {
    console.log("plase work");
    const articleID = props.match.params.articleID;
    axios.delete(`http://127.0.0.1:8000/api/${articleID}/delete/`);
  };

  useEffect(() => {
    console.log(props.match.articleID);
    const articleID = props.match.params.articleID;
    axios
      .get(`http://127.0.0.1:8000/api/${articleID}`)
      .then((res) => {
        setarticle(res.data);
        console.log(article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Card title={article.title}>
        <p>{article.content}</p>
      </Card>
      <CustomForm
        requestType="put"
        articleID={props.match.params.articleID}
        btnText="Update"
      />
      <form onSubmit={handleDelete}>
        <Button type="danger" htmlType="submit">
          Delete
        </Button>
      </form>
    </div>
  );
};

export default ArticleDetail;
