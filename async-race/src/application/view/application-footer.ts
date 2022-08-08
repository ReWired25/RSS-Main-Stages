import elementCreater, { createSVGImage } from '../utilites/overall-functions';
import githubIconTemplate from '../utilites/github-icon-svg';
import rssIconTemplate from '../utilites/rss-icon-svg';

const createGithubLink = () => {
  const link = <HTMLAnchorElement>elementCreater('a', 'github-link');
  link.href = 'https://github.com/ReWired25';
  const githubSvg = createSVGImage(
    githubIconTemplate,
    'github-image',
    'github-image-icon'
  );
  const linkText = elementCreater('span', 'github-link-text');
  linkText.innerHTML = 'ReWired25';
  link.append(githubSvg, linkText);
  return link;
};

const createAppYear = () => {
  const year = elementCreater('p', 'app-year');
  year.innerHTML = '2022';
  return year;
};

const createRssLink = () => {
  const link = <HTMLAnchorElement>elementCreater('a', 'rss-link');
  link.href = 'https://rs.school/js/';
  const githubSvg = createSVGImage(
    rssIconTemplate,
    'rss-image',
    'rss-image-icon'
  );
  link.append(githubSvg);
  return link;
};

const createAppFooter = () => {
  const footerWrapper = elementCreater('footer', 'app-footer');
  const github = createGithubLink();
  const year = createAppYear();
  const rss = createRssLink();
  footerWrapper.append(github, year, rss);
  return footerWrapper;
};

export default createAppFooter;
