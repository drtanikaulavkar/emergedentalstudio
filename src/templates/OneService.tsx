type IServiceProps = {
  title: string;
  summary?: string;
  photo: string;
  keywords?: string[];
};

const OneService = (props: IServiceProps) => {
  return (
    <div className="card w-64 rounded-md card-compact bg-primary-0 shadow-sm hover:border-2 hover:border-primary-400">
      <figure>
        <img src={props.photo} alt={props.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary-700">{props.title}</h2>
        <p>{props.summary}</p>
        <div className="card-actions justify-end">
          {props.keywords?.map((keyword) => (
            <div className="badge badge-outline badge-primary" key={keyword}>
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { OneService };
