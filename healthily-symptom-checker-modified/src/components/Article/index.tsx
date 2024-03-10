type ArticleProps = {
  heading: string;
  snippet: string;
  url: string;
};

const Article: React.FC<ArticleProps> = ({ heading, snippet, url }) => (
  <div>
    <h1>{heading}</h1>
    <p>{snippet}</p>
    <a target="_blank" href={url}>
      {heading}
    </a>
  </div>
);

const ArticleContainer: React.FC<ArticleProps> = ({
  heading,
  snippet,
  url,
}) => (
  <div>
    <Article heading={heading} snippet={snippet} url={url} />
  </div>
);

export default ArticleContainer;
