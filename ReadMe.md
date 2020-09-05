<div align="center">
<h1>@bilal111996/react-range-slider</h1>

<p>❤ Awesome Range slider ❤</p>
</div>

---

<!-- prettier-ignore-start -->
[![npm](https://img.shields.io/npm/v/@bilal111996/react-range-slider)](https://www.npmjs.com/package/@bilal111996/react-range-slider)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
<!-- prettier-ignore-end -->

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Showcase](#showcase)
- [Usage](#usage)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] and should be installed as one of your project's `dependencies`:

```
npm install --save @bilal111996/react-range-slider
```

or

```
yarn add @bilal111996/react-range-slider
```

## Showcase

![@bilal111996/react-range-slider verticle](https://drive.google.com/file/d/1EcFlV691uXyeB1olkzMOeSvxrU5SGaxb/view?usp=sharing)

![@bilal111996/react-range-slider horizontal](https://drive.google.com/file/d/1E5aG8xx3SVVgx3REwSQA67xwJiYuwz0N/view?usp=sharing)

## Usage

```javascript
import RangeSlider from '@bilal111996/react-range-slider';

export default App = () => {
    return (
        <RangeSlider
            orientation="VERTICAL" // "HORIZONTAL | VERTICAL"               //defaults to HORIZONTAL
            markSpacing={20}         // Spacing value between tracks (in px)     *REQUIRED*
            trackColor="#212121"     // The slider's track color          //defaults to #212121
            thumbColor="whitesmoke"  // Background color for the thumb (movable part)   //defaults to whitesmoke
            thumbTextColor="#0277BD" // Color for the text in the thumb  //defaults to #0D47A1
            thumbSize={45}           // The size of the thumb(in px)     //defaults to 40
            sliderColor="whitesmoke" // Background color for the slider  //defaults to whitesmoke
            range={[1, 20]}           // The sliders range [lower, upper]  *REQUIRED*
            visibleCount={9}         // The number of elements to be visible by default  *REQUIRED*
            defaultStart={1}         // default value to start rangeSlider
            onChange={(selectedValue) => {  // Callback to received new value when slider value changes
                console.log("SELECTED VALUE ", selectedValue)
            }}
        />
    )
}

```

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/bilalyaqoob">
        <img src="https://avatars0.githubusercontent.com/u/31065558?s=460&u=64e35e798a6f830a5bf3d448cd02699976ad15a2&v=4" width="100px;" alt="Bilal Yaqoob"/>
        <br />
        <sub>
          <b>Bilal Yaqoob</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT