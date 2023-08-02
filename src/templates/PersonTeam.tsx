import Image from 'next/image';

type IServiceProps = {
  name: string;
  designation?: string;
  qualification?: string;
  description?: string;
  photo?: string;
};

const PersonTeam = (props: IServiceProps) => {
  return (
    <div className="max-w-md flex flex-col justify-between">
      <div className="w-full relative h-72 bg-primary-100 rounded-t-xl">
        {props.photo && (
          <Image
            src={props.photo}
            alt={props.name}
            layout="fill"
            className="w-full h-auto"
          />
        )}
      </div>
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
