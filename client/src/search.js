import styled, {css} from 'styled-components';  
 

export const SearchContainer = styled.div`
    position: relative;
    width:5vh;
    height: 5vh;
    box-sizing: border-box;
    border-radius:50px;
    border:4px solid #393e46;
    padding: 5px;
    background: #22831;
    transition: all 0.5s ease-out;

    float: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;

    ${({hover}) =>
        hover &&
        css`
            width: 40%;
            -webkit-box-shadow: 4px 10px 15px 5px rgba(0,0,0, 0.74);
            box-shadow: 4px 4px 15px 5px rgba(0,0,0, 0.74);
            border: 4px solid #00adb5;

            @media (min-width: 768px) {
                width: 60%;
            }
        `}  
`;
export const SearchInput = styled.input`
    position: absolute;
    justify-content: flex-end;
    top:0;
    left: 0;
    width:100%;
    height:4vh;
    line-height:30px;
    outline: 0;
    border:0;
    font-size: 1.5rem;
    border-radius: 20px;
    padding: 0 20px;
    margin: 0;
    font-family: Lato, sans-serif;
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance: none;
    float:right;

    display: ${(props) => (props.showSearchInput ? 'flex' : 'none')}
`;

