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
    <div className="bg-slate-100 flex flex-col justify-between p-4">
      <div className="h-64 relative">
        {props.photo && (
          <Image src={props.photo} alt={props.name} layout="fill" />
        )}
      </div>
      <div className="pt-2 grow">
        <h2 className="text-xl font-medium text-primary-700">{props.name}</h2>
        <p className="text font-light">{props.qualification}</p>
      </div>
      <div className="pt-4">
        <p>{props.designation}</p>
      </div>
    </div>
  );
};

export { PersonTeam };
