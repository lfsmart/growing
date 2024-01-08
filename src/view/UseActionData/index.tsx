
import { useActionData, Form, redirect, ActionFunctionArgs } from "react-router-dom";

interface Errors {
  email?: string;
  password?: string;
}

export default function SignUp() {
  const errors = useActionData() as Errors;
  return (
    <Form method="post">
      <p>
        <input type="text" name="email" />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type="submit">Sign up</button>
      </p>
    </Form>
  );
}

export async function action({ request, params }: ActionFunctionArgs ) {
  console.log( request, params, '---' );
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: Errors = {};

  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }


  // redirect

  // otherwise create the user and redirect
  // await createUser(email, password);

  // return redirect("/todoList");
}