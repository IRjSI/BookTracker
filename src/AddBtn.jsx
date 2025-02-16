import React from 'react';
import styled from 'styled-components';

const Checkbox = () => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" />
        <div className="checkmark">
          <p className="No name">+</p>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    --UnChacked-color: hsl(0, 0%, 10%);
    --chacked-color: hsl(216, 100%, 60%);
    --font-color: white;
    --chacked-font-color: var(--font-color);
    --icon-size: 1.5em;
    --anim-time: 0.2s;
    --anim-scale: 0.1;
    --base-radius: 0.8em;
  }

  .container {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    fill: var(--font-color);
    color: var(--font-color);
  }

  /* Hide the default checkbox */
  .container input {
    display: none;
  }

  /* Base custom checkbox */
  .checkmark {
    background: var(--UnChacked-color);
    border-radius: var(--base-radius);

    display: flex;
    padding: 0.5em;
  }
  .icon {
    width: var(--icon-size);
    height: auto;
    filter: drop-shadow(0px 2px var(--base-radius) rgba(0, 0, 0, 0.25));
  }
  .name {
    margin: 0 0.25em;
  }
  .Yes {
    width: 0;
  }
  .name.Yes {
    display: none;
  }

  /* action custom checkbox */
  .container:hover .checkmark,
  .container:hover .icon,
  .container:hover .name {
    transform: scale(calc(1 + var(--anim-scale)));
  }

  .container:active .checkmark,
  .container:active .icon,
  .container:active .name {
    transform: scale(calc(1 - var(--anim-scale) / 2));
    border-radius: calc(var(--base-radius) * 2);
  }
  .checkmark::before {
    content: "";
    opacity: 0.5;
    transform: scale(1);
    border-radius: var(--base-radius);
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .checkmark:hover:before {
    background-color: hsla(0, 0%, 50%, 0.2);
  }
  .container input:checked + .checkmark:before {
    animation: boon calc(var(--anim-time)) ease;
    animation-delay: calc(var(--anim-time) / 2);
  }`


export default Checkbox;
