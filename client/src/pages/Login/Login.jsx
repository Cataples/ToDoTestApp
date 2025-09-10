import { Loading } from "../../components/reusables/loading/Loading";
import { PageContainer } from "../../components/reusables/pageContainer/PageContainer";
import useLogin from "../../hooks/useLogin";
import classNames from "classnames";

import "./Login.style.css";
import "../../components/reusables/styles/globalStyles.css";

export const Login = () => {
  const {
    setUsername,
    setPassword,
    login,
    loading,
    error,
    username,
    password,
  } = useLogin();

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer centerContent={true}>
      <div className="form-container">
        <div className="inputs-container">
          <input
            className="simple-input"
            placeholder="username"
            onChange={setUsername}
          />
          <input
            className="simple-input"
            placeholder="password"
            type="password"
            onChange={setPassword}
          />
        </div>
        <div className="buttons-container">
          <button
            className={classNames("simple-button", {
              disabled: !username.length || !password.length,
            })}
            onClick={login}
          >
            Login
          </button>
        </div>
        {error && (
          <p className="error-message">
            There has been an issue with your login
          </p>
        )}
      </div>
    </PageContainer>
  );
};
