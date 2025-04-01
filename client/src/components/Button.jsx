function Button(props) {
  return (
    <div>
      <button
        {...props}
        className=" rounded-lg bg-slate-600 my-3 p-2 text-white font-bold text-sm"
      >
        {props.children}
      </button>
    </div>
  );
}

export default Button;
