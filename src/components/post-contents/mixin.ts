import { css } from 'styled-components'

export const contentText = css`
  /* 제목 */
  h2 {
    font-size: 2.2rem;
    padding: 1.5rem 0;
    font-weight: bold;
    margin: 5rem 0 1rem;
  }

  h3 {
    font-size: 1.7rem;
    margin-top: 1rem;
    padding: 2rem 0 0.8rem;
    font-weight: bold;
  }

  /* text */
  p {
    font-weight: 300;
    margin: auto;
  }

  :not(ol) > p, :not(ul) > p {
    width: 100%;
  }

  a {
    font-weight: 600;
  }

  ul {
    display: inline-block; 
  }
  
  /* list */
  ol, ul {
    padding: 5px 0;
    width: 94%;

    > li {
      margin: 0 5px 10px 0;
    }
  }

  /* 이미지 */
  p > .gatsby-resp-image-wrapper {
    margin: 15px 0;
  }

  /* 강조색 */
  .em {
    font-weight: bold;

    &.red {
      color: red;
    }
  }
`
