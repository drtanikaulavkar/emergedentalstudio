type IServiceProps = {
  title: string;
  summary?: string;
  photo?: string;
  keywords?: string[];
  titleCenter?: boolean;
  mdLgWidth?: string;
};

const OneService = (props: IServiceProps) => {
  return (
    <div
      className={`card card-compact max-w-sm ${
        props.mdLgWidth ? `md:lg:${props.mdLgWidth}` : 'md:lg:w-72'
      } bg-primary-0 shadow-sm`}
      // } bg-primary-0 shadow-sm hover:border-2 hover:border-primary-400`}
    >
      <figure>
        {props.photo && <img src={props.photo} alt={props.title} />}
      </figure>
      <div className="card-body">
        <h2
          className={`card-title text-primary-700 ${
            props.titleCenter ? 'mx-auto' : ''
          }`}
        >
          {props.title}
        </h2>
        <p className="text-base">{props.summary}</p>
        <div
          className={`card-actions ${
            props.titleCenter ? 'justify-center' : 'justify-end'
          }`}
        >
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
