type IServiceProps = {
  name: string;
  designation?: string;
  qualification?: string;
  description?: string;
  photo?: string;
};

const PersonTeam = (props: IServiceProps) => {
  return (
    <div className="max-w-sm card flex flex-col justify-between">
      {props.photo && (
        <img
          className="w-full relative flex-grow bg-primary-100 rounded-t-xl"
          src={props.photo}
          alt={props.name}
        />
      )}
      <div className=" bg-slate-100 p-4 rounded-b-xl">
        <div className="grow">
          <h2 className="text-xl font-medium text-primary-700">{props.name}</h2>
          <p className="text font-light">{props.qualification}</p>
        </div>
        <div className="pt-4">
          <p>{props.designation}</p>
        </div>
      </div>
    </div>
  );
};

export { PersonTeam };
