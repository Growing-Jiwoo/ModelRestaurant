import styled from 'styled-components';

const FooterStyle = styled.footer`
  footer {
    position: absolute;
    height: 60px;
    width: 100%;
    padding: 0 25px;
    line-height: 60px;
    color: #8a8c8f;
    border-top: 1px solid #dee5e7;
    background-color: #f2f2f2;
    text-align: center;
  }
`;

function Footer(): JSX.Element {
  return (
    <FooterStyle>
      <footer>
        <h2>This is Footer</h2>
      </footer>
    </FooterStyle>
  );
}

export default Footer;
