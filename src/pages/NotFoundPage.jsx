import Styles from "../styles/NotFoundPage.module.scss";
export default function NotFoundPage() {
  return (
    <div className={Styles.container}>
      <img src="/images/not_found.svg" alt="" />
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  );
}
