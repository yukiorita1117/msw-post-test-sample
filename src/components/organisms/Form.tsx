import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import styled from "styled-components";
import styles from "./style.module.css";

const Container = styled.div`
  width: 1000px;
  height: 800px;
  padding: 100px 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-top: 16px;
  margin-left: 8px;
`;

const RequiredInput = styled.input`
  margin-top: 16px;
  margin-left: 8px;
`;

const SubmitButton = styled.input`
  margin-top: 16px;
`;

const ErrorMessage = styled.span`
  margin-top: 8px;
  color: red;
`;

// -------------------------------------------------------------------- //

type Inputs = {
  example: string;
  exampleRequired: string;
};
// -------------------------------------------------------------------- //

const contentStyle: React.CSSProperties = {
  width: "50%",
};
const overlayStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.5)",
};
// -------------------------------------------------------------------- //

export const Form = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = () => {
    axios
      .post("https://myapi.dev/csr/post", {})
      .then((response) => {
        // console.log("post response::", response);
        if (response.data.data) {
          setIsOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <label>
            First Name:
            {/* register "機能を使って、入力した内容をフックに登録します。 */}
            <Input defaultValue="test" {...register("example")} />
          </label>
          <label>
            Last Name:
            {/* 必須または他の標準的なHTML検証ルールによる検証を含む */}
            <RequiredInput
              {...register("exampleRequired", { required: true })}
            />
            {/* フィールドの検証に失敗した場合、エラーが返されます。  */}
            {errors.exampleRequired && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </label>
          <SubmitButton type="submit" />
          <br />
          {/* Modal */}
          <Popup
            contentStyle={contentStyle}
            overlayStyle={overlayStyle}
            open={isOpen}
            modal
            nested
          >
            {(close) => (
              <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                  &times;
                </button>
                <div className={styles.header}> Modal Title </div>
                <div className={styles.content}>
                  <p>
                    post response です。
                    <br />
                  </p>
                </div>
                <div className={styles.actions}>
                  <Popup
                    trigger={
                      <button className={styles.button}>
                        この内容で問題ないですか？
                      </button>
                    }
                    position="top center"
                    modal
                    nested
                  >
                    この時POST処理
                  </Popup>
                </div>
              </div>
            )}
          </Popup>
          {/* sample */}
          <Popup
            contentStyle={contentStyle}
            overlayStyle={overlayStyle}
            trigger={<button className="button"> モーダルを開く </button>}
            modal
          >
            {(close) => (
              <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                  &times;
                </button>
                <div className={styles.content}>
                  <p>モーダルコンテンツ</p>
                </div>
              </div>
            )}
          </Popup>
        </Wrapper>
      </form>
    </Container>
  );
};
