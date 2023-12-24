const MenuListItem = ({ content, icon, eventHandler }) => {
  return (
    <ul
      className="px-4 py-2 flex items-center hover:bg-customColor1 hover:text-customColor2 cursor-pointer"
      onClick={() => eventHandler()}
    >
      {icon}
      {content}
    </ul>
  );
};

export default MenuListItem;
