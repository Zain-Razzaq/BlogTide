export const Button1 = ({ buttonContent, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="border border-customColor1 p-2 hover:bg-customColor1 hover:text-customColor3"
    >
      {buttonContent}
    </button>
  );
};

export const Button2 = ({ buttonContent, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="px-4 text-customColor2 border border-customColor2 p-2 mt-3  hover:bg-customColor2 hover:text-customColor1 "
    >
      {buttonContent}
    </button>
  );
};
