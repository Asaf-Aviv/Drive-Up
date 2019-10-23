import styled from 'styled-components';

interface Typography {
  size?: string;
  margin?: string;
  fontStyle?: string;
  fontWeight?: number;
  color?: string;
  align?: string;
}

const Typography = styled.p<Typography>`
  ${({ size }) => size && `
    font-size: ${size};
  `}
  ${({ margin }) => margin && `
    margin: ${margin};
  `}
  ${({ fontWeight }) => fontWeight && `
    font-weight: ${fontWeight};
  `}
  ${({ fontStyle }) => fontStyle && `
    font-style: ${fontStyle};
  `}
  ${({ color }) => color && `
    color: ${color};
  `}
  ${({ align }) => align && `
    text-align: ${align};
  `}
`;

export default Typography;
