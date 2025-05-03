import './Footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <p>
        There are many scoring and play variations of farkel. This version
        relies on the scoring rules{' '}
        <a
          href="https://kingdom-come-deliverance.fandom.com/wiki/Dice"
          target="_blank"
        >
          found here
        </a>
        .
      </p>
    </div>
  );
};
