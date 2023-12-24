const FormInput = ({ inputProp, placeholder, error, value = "" }) => {
  return (
    <div className="felx flex-col">
      <input
        {...inputProp}
        placeholder={placeholder}
        type="text"
        defaultValue={value}
        className="border-2 outline-none rounded-md h-12 my-2 p-2 w-full focus:border-customColor1"
      />
      {error && (
        <p className="text-sm text-red-700">{placeholder} is invalid</p>
      )}
    </div>
  );
};

export default FormInput;
