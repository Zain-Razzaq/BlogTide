import { useForm } from "react-hook-form";

const SearchBar = ({ defaultValue = "", handelFormSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(handelFormSubmit)}
      className="px-2 py-1 border-2 border-customColor1 bg-customColor2"
    >
      <input
        {...register("searchQuery", { required: true })}
        type="text"
        className=" bg-customColor2 outline-none w-full autofill:bg-customColor1 "
        placeholder="Search..."
        defaultValue={defaultValue}
      />
    </form>
  );
};

export default SearchBar;
