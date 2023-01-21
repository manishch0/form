import React from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as yup from "yup";
import NextPage from "../nextPage/NextPage";

const schema = yup
  .object({
    email: yup.string().required("Email is required").email("email is invaild"),
    password: yup.string().required("Password isreq"),
  })
  .required();

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const DoLogin = async (email: any, password: any) => {
    const user = {
      email: email,
      password: password,
    };
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    localStorage.setItem("token", json.token);

    console.log(await res.json());
  };
  const onSubmit = (data: any) => {
    const { email, password } = data;
    if (email && password) {
      console.log(email, password);
      DoLogin(email, password);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="text"
          {...register("email")}
          aira-invaild={errors.email ? "true" : "false"}
        />
        <p className="error">{errors.email?.message?.toString()}</p>
        <label htmlFor="">Password</label>
        <input
          type="password"
          {...register("password")}
          aira-invaild={errors.email ? "true" : "false"}
        />
        <p className="error">{errors.email?.message?.toString()}</p>

        <div>
          <button>Sign in</button>
        </div>
        <NextPage />
      </form>
    </div>
  );
}

export default Form;
