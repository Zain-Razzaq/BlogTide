import { Button1 } from "../lib/SubmitButtons";

const PageNavigator = ({ page, setPage, maxPage }) => {
  return (
    <div className="flex justify-between items-center px-5">
      <div onClick={() => setPage(page - 1)}>
        <Button1 buttonContent={"Previous"} disabled={page < 1} />
      </div>
      <p>
        Page {page + 1} of {maxPage}
      </p>
      <div onClick={() => setPage(page + 1)}>
        <Button1 buttonContent={"Next"} disabled={maxPage - 1 <= page} />
      </div>
    </div>
  );
};

export default PageNavigator;
