<template>
    <div class="publish-guide">
        <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
        <div class="top">
            <a href="/guide"><img src="/images/default/img_logo.png" alt="x-coach"></a>
            <p>Design style guide v.1</p>
       </div>
       <nav :class="{ 'is-active' : handleMenu }">
            <button type="button" class="btn-menu" @click="handleMenu = !handleMenu">
                <img src="/images/icon/icon_list.png" alt="icon_list" />
            </button>
            <dl>
                <dd v-for="(item, index) in gnbList" :key="index">
                    <a  :href="`# + ${item.name}`" 
                        :data-section-id="item.name"
                        :class="{ 'is-active' : item.name === 'Colors' }"
                        ref="gnbListlink"
                        @click.prevent="scrollTo(item.name, $event)">{{ item.name }}</a>
                </dd>
            </dl>
       </nav>
       <main>
            <section class="container" id="Colors">
                <h2 class="title">Colors</h2>
                <div class="cont">
                    <p class="desc">Primary Color</p>
                    <div class="color">
                        <div class="color-list" v-for="(item, index) in PrimaryColor" :key="index">
                            <div class="color-list-item" @click="colorCopy(item.color)">
                                <div :style="{ backgroundColor: '#' + item.color }"></div>
                                <p>#{{ item.color }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Indicatation Color</p>
                    <div class="color">
                        <div class="color-list" v-for="(item, index) in IndicatationColor" :key="index">
                            <div class="color-list-item" @click="colorCopy(item.color)">
                                <div :style="{ backgroundColor: '#' +  item.color }"></div>
                                <p>#{{ item.color }}</p>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="toast-modal" ref="toastRef" v-if="colorMessageShow">
                            <p class="message">{{ colorMessage }}</p>
                        </div>
                    </transition>
                </div>
                <div class="cont">
                    <p class="desc">Grayscale Color</p>
                    <div class="color">
                        <div class="color-list" v-for="(item, index) in GrayscaleColor" :key="index">
                            <div class="color-list-item" @click="colorCopy(item.color)">
                                <div :style="{ backgroundColor: '#' + item.color }"></div>
                                <p>#{{ item.color }}</p>
                            </div>
                            <div class="color-list-sub" v-if="item.name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Accent Color</p>
                    <div class="color">
                        <div class="color-list" v-for="(item, index) in AccentColor" :key="index">
                            <div class="color-list-item" @click="colorCopy(item.color)">
                                <div :style="{ backgroundColor: '#' + item.color }"></div>
                                <p>#{{ item.color }}</p>
                            </div>
                            <div class="color-list-sub" v-if="item.name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container" id="Tyopgraphy">
                <h2 class="title">Tyopgraphy</h2>
                <div class="cont">
                    <p class="desc">Typeface</p>
                    <div class="font">
                        <p class="font-list" style="font-family: 'Pretendard'; font-weight: 300;">Pretendard / Light 300</p>
                        <p class="font-list" style="font-family: 'Pretendard'; font-weight: 400;">Pretendard / Regular 400</p>
                        <p class="font-list" style="font-family: 'Pretendard'; font-weight: 500;">Pretendard / Medium 500</p>
                        <p class="font-list" style="font-family: 'Pretendard'; font-weight: 600;">Pretendard / Semi Bold 600</p>
                        <p class="font-list" style="font-family: 'Pretendard'; font-weight: 700;">Pretendard / Bold 700</p>
                        <br><br>
                        <p class="font-list" style="font-family:'Inter'; font-weight: 300;">Inter / Light 300</p>
                        <p class="font-list" style="font-family:'Inter'; font-weight: 400;">Inter / Regular 400</p>
                        <p class="font-list" style="font-family:'Inter'; font-weight: 500;">Inter / Medium 500</p>
                        <p class="font-list" style="font-family:'Inter'; font-weight: 600;">Inter / Semi Bold 600</p>
                        <p class="font-list" style="font-family:'Inter'; font-weight: 700;">Inter / Bold 700</p>
                        <br><br>
                        <p class="font-list" style="font-family:'Pacifico'; font-weight: 400;">Pacifico / Regular</p>
                        <br><br>
                        <p class="font-list" style="font-family:'Nunito'; font-weight: 300;">Nunito / Light 300</p>
                        <p class="font-list" style="font-family:'Nunito'; font-weight: 400;">Nunito / Regular 300</p>
                        <p class="font-list" style="font-family:'Nunito'; font-weight: 500;">Nunito / Medium 300</p>
                        <p class="font-list" style="font-family:'Nunito'; font-weight: 600;">Nunito / Semi Bold 300</p>
                        <p class="font-list" style="font-family:'Nunito'; font-weight: 700;">Nunito / Bold 300</p>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Headings</p>
                    <div class="font" style="line-height: 1.5;">
                        <h1>h1. heading 48px</h1>
                        <h2>h2. heading 32px</h2>
                        <h3>h3. heading 28px</h3>
                        <h4>h4. heading 24px</h4>
                        <h5>h5. heading 20px</h5>
                        <h6>h6. heading 16px</h6>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Display Headings</p>
                    <div class="font">
                        <p class="font-list" style="font-size: 80px;">Display1 80px</p>
                        <p class="font-list" style="font-size: 72px;">Display2 72px</p>
                        <p class="font-list" style="font-size: 64px;">Display3 64px</p>
                        <p class="font-list" style="font-size: 56px;">Display4 56px</p>
                        <p class="font-list" style="font-size: 48px;">Display5 48px</p>
                        <p class="font-list" style="font-size: 40px;">Display6 40px</p>
                    </div>
                </div>
            </section>
            <section class="container" id="Icons">
                <h2 class="title">Icons</h2>
                <div class="cont">
                    <p class="desc">Google Material Symbols</p>
                    <div class="icons">
                        <ul>
                            <li v-for="(item, index) in iconList" :key="index" @click="iconCopy(item.name)">
                                <img :src="`/images/icon/${item.name}.png`" :alt="item.name">
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="container" id="Forms">
                <h2 class="title">Forms</h2>
                <div class="cont">
                    <p class="desc">Styling & Sizing</p>
                    <div class="forms">
                        <div class="forms-list">
                            <div class="forms-list-row">
                                <div class="input-text">
                                    <input type="text" class="lg" placeholder=".form-control-lg" style="width: 320px;">
                                </div>
                            </div>
                            <div class="forms-list-row">
                                <div class="select-default">
                                    <select class="lg" style="width: 320px;">
                                        <option>.form-select-lg</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="forms-list">
                            <div class="forms-list-row">
                                <div class="input-text">
                                    <input type="text" class="md" placeholder=".form-control-md" style="width: 320px;">
                                </div>
                            </div>
                            <div class="forms-list-row">
                                <div class="select-default">
                                    <select class="md" style="width: 320px;">
                                        <option>.form-select-md</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="forms-list">
                            <div class="forms-list-row">
                                <div class="input-text">
                                    <input type="text" class="sm" placeholder=".form-control-sm" style="width: 320px;">
                                </div>
                            </div>
                            <div class="forms-list-row">
                                <div class="select-default">
                                    <select class="sm" style="width: 320px;">
                                        <option>.form-select-sm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="forms-list">
                            <div class="forms-list-row">
                                <div class="input-search">
                                    <div class="input-text">
                                        <input type="text" 
                                               v-model="inputSearch"
                                               @input="handleInput"
                                               placeholder="검색내용을 입력하세요." 
                                               style="width: 320px;">
                                        <button type="button" class="btn-close" v-if="isClose" @click="handleInputSearch">
                                            <i />
                                        </button>
                                        <button type="button" class="btn-search" v-else>
                                            <i />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="forms-list-row">
                                <div class="form-list">
                                    <div class="input-text type-select">
                                        <input type="text" style="width: 320px;"
                                        placeholder="Search" 
                                        :class="{ 'is-active' : selectShow1 === true }" 
                                        readonly
                                        :value="selectInput1"
                                        class="lg"
                                        @click="selectShow1 = !selectShow1">
                                    </div>
                                    <img src="/images/icon/icon_arrow_down.png" alt="icon_arrow_down" :class="{ 'is-active' : selectShow1 }">
                                    <transition name="slide">
                                        <ul class="select-list" v-if="selectShow1" ref="inputContRef">
                                            <li class="select-list-item" v-for="(item, index) in optionList" :key="index">
                                                <div class="select-item">
                                                    <input type="radio" id="radio_0" name="radio_custom" :value="item" v-model="inputItems1" @click="selectShow1 = false">
                                                    <label for="radio_0">{{ item }}</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </transition>
                                </div>
                            </div>
                        </div>
                        <div class="forms-list">
                            <div class="forms-list-row">
                                <div class="form-list">
                                    <div class="input-text type-filter">
                                        <input type="text"
                                        placeholder="Search" 
                                        :class="{ 'is-active' : selectShow2 === true }" 
                                        readonly
                                        :value="selectInput2"
                                        class="lg"
                                        @click="selectShow2 = !selectShow2">
                                    </div>
                                    <img src="/images/icon/icon_arrow_down_teal.png" alt="icon_arrow_down_teal" :class="{ 'is-active' : selectShow2 }">
                                    <transition name="slide">
                                        <ul class="select-list" v-if="selectShow2" ref="inputContRef">
                                            <li class="select-list-item" v-for="(item, index) in optionList" :key="index">
                                                <div class="select-item">
                                                    <input type="radio" id="radio_0" name="radio_custom" :value="item" v-model="inputItems2" @click="selectShow2 = false">
                                                    <label for="radio_0">{{ item }}</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Status & Validation</p>
                    <div class="forms-list">
                        <div class="forms-list-row">
                            <div class="input-text">
                                <input type="text" class="input-text-lg" placeholder="Empty" style="width: 320px;">
                            </div>
                        </div>
                        <div class="forms-list-row">
                            <div class="select-default">
                                <select style="width: 320px;">
                                    <option>Default</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="forms-list">
                        <div class="forms-list-row">
                            <div class="input-text">
                                <input type="text" class="input-text-lg" placeholder="Disable" disabled style="width: 320px;">
                            </div>
                        </div>
                        <div class="forms-list-row">
                            <div class="select-default">
                                <select disabled style="width: 320px;">
                                    <option>Disable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="forms-list">
                        <div class="forms-list-row">
                            <div class="input-text">
                                <input type="text" class="input-text-lg" placeholder="Focus" style="border: 1px solid #298097; width: 320px;">
                            </div>
                        </div>
                        <div class="forms-list-row">
                            <div class="select-default">
                                <select style="border: 1px solid #298097; width: 320px;">
                                    <option>Focus</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="forms-list">
                        <div class="forms-list-row">
                            <div class="input-text">
                                <input type="text" class="input-text-lg" value="Filled" style="width: 320px;">
                            </div>
                        </div>
                        <div class="forms-list-row">
                            <div class="select-default">
                                <select style="width: 320px;">
                                    <option>Selected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="forms-list">
                        <div class="forms-list-row">
                            <div class="input-form success">
                                <div class="input-text">
                                    <input type="text" value="Success" placeholder="success" pattern="[a-z]*" style="width: 320px;">
                                    <i class="icon" />
                                </div>
                            </div>
                        </div>
                        <div class="forms-list-row">
                            <div class="input-form error">
                                <div class="input-text">
                                    <input type="text" value="Error" placeholder="error" pattern="[a-z]*" style="width: 320px;">
                                    <i class="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Search</p>
                    <div class="form-wrap">
                        <div class="form-list">
                            <div class="input-text type-select">
                                <input type="text"
                                placeholder="매장명" 
                                :class="{ 'is-active' : selectShow3 === true }" 
                                readonly
                                :value="selectInput3"
                                @click="selectShow3 = !selectShow3">
                            </div>
                            <img src="/images/icon/icon_arrow_down.png" alt="icon_arrow_down" :class="{ 'is-active' : selectShow3 }">
                            <transition name="slide">
                                <ul class="select-list" v-if="selectShow3" ref="inputContRef">
                                    <li class="select-list-item" v-for="(item, index) in optionList" :key="index">
                                        <div class="select-item">
                                            <input type="radio" id="radio_0" name="radio_custom" :value="item" v-model="inputItems3" @click="selectShow3 = false">
                                            <label for="radio_0">{{ item }}</label>
                                        </div>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                        <div class="form-list">
                            <div class="input-text">
                                <input type="text" class="lg">
                            </div>
                            <button type="button" class="btn-search">검색</button>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Checkboxes</p>
                    <div class="checkbox">
                        <div class="checkbox-list">
                            <div class="check-box">
                                <input type="checkbox" id="chk_0" name="chk_0">
                                <label for="chk_0">
                                    <span class="check-box-item">
                                        <i class="item-line" />
                                    </span>
                                    <span class="check-box-txt">Default</span>
                                </label>
                            </div>
                        </div>
                        <div class="checkbox-list">
                            <div class="check-box">
                                <input type="checkbox" id="chk_1" name="chk_1" checked>
                                <label for="chk_1">
                                    <span class="check-box-item">
                                        <i class="item-line" />
                                    </span>
                                    <span class="check-box-txt">Checked</span>
                                </label>
                            </div>
                        </div>
                        <div class="checkbox-list">
                            <div class="check-box">
                                <input type="checkbox" id="chk_2" name="chk_2" disabled>
                                <label for="chk_2">
                                    <span class="check-box-item">
                                        <i class="item-line" />
                                    </span>
                                    <span class="check-box-txt">Disabled</span>
                                </label>
                            </div>
                        </div>
                        <div class="checkbox-list">
                            <div class="check-box">
                                <input type="checkbox" id="chk_3" name="chk_3" disabled checked>
                                <label for="chk_3">
                                    <span class="check-box-item">
                                        <i class="item-line" />
                                    </span>
                                    <span class="check-box-txt">Disabled - checked</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Radios</p>
                    <div class="radiobox">
                        <div class="radiobox-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_0" name="radio_0">
                                <label for="radio_0">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">Default</span>
                                </label>
                            </div> 
                        </div>
                        <div class="radiobox-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_1" name="radio_0" checked> 
                                <label for="radio_1">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">Checked</span>
                                </label>
                            </div>
                        </div>
                        <div class="radiobox-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_2" name="radio_0" disabled>
                                <label for="radio_2">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">Disabled</span>
                                </label>
                            </div>
                        </div>
                        <div class="radiobox-list">
                            <div class="radio-box">
                                <input type="radio" id="radio_3" name="radio_1" disabled checked>
                                <label for="radio_3">
                                    <span class="check-box-item" />
                                    <span class="check-box-txt">Disabled - checked</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Toggle</p>
                    <div class="toggle">
                        <div class="toggle-list">
                            <div class="btn-toggle">
                                <label for="toggle_normal_off" class="btn-toggle-txt">Toggle ON</label>
                                <input type="checkbox" id="toggle_normal_off" class="btn-toggle-chk" hidden checked>
                                <label for="toggle_normal_off" class="btn-toggle-box">
                                    <span class="btn-toggle-circle"></span>
                                </label>
                            </div>
                        </div>
                        <div class="toggle-list">
                            <div class="btn-toggle">
                                <label for="toggle_normal_on" class="btn-toggle-txt">Toggle - OFF</label>
                                <input type="checkbox" id="toggle_normal_on" class="btn-toggle-chk" hidden>
                                <label for="toggle_normal_on" class="btn-toggle-box">
                                    <span class="btn-toggle-circle"></span>
                                </label>
                            </div>
                        </div>
                    </div> 
                </div>
            </section>
            <section class="container" id="Buttons">
                <h2 class="title">Buttons</h2>
                <div class="cont">
                    <p class="desc">Primary Button</p>
                    <div class="buttons">
                        <div class="buttons-list">
                            <button type="button" class="btn-default btn-md-fill">Normal</button>
                            <button type="button" class="btn-default btn-md-fill" style="background: #5a5a5a;">Hover</button>
                            <button type="button" class="btn-default btn-md-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-default btn-sm-fill">Normal</button>
                            <button type="button" class="btn-default btn-sm-fill" style="background: #5a5a5a;">Hover</button>
                            <button type="button" class="btn-default btn-sm-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-primary-yellow btn-md-fill">Normal</button>
                            <button type="button" class="btn-primary-yellow btn-md-fill" style="background: #fac65c;">Hover</button>
                            <button type="button" class="btn-primary-yellow btn-md-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-primary-yellow btn-sm-fill">Normal</button>
                            <button type="button" class="btn-primary-yellow btn-sm-fill" style="background: #fac65c;">Hover</button>
                            <button type="button" class="btn-primary-yellow btn-sm-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-primary-teal btn-md-fill">Normal</button>
                            <button type="button" class="btn-primary-teal btn-md-fill" style="background: #298097;">Hover</button>
                            <button type="button" class="btn-primary-teal btn-md-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-primary-teal btn-sm-fill">Normal</button>
                            <button type="button" class="btn-primary-teal btn-sm-fill" style="background: #298097;">Hover</button>
                            <button type="button" class="btn-primary-teal btn-sm-fill" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-more-fill">더보기</button>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">Secondary Button</p>
                    <div class="buttons">
                        <div class="buttons-list">
                            <button type="button" class="btn-md-line">Default</button>
                            <button type="button" class="btn-md-line" style="background: #F6F6F5; border: 1px solid #ccc; color: #5a5a5a;">Hover</button>
                            <button type="button" class="btn-md-line" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-sm-line">Default</button>
                            <button type="button" class="btn-sm-line" style="background: #F6F6F5; border: 1px solid #ccc; color: #5a5a5a;">Hover</button>
                            <button type="button" class="btn-sm-line" disabled>Disable</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-more-line">더보기</button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-next">
                                <svgArrow />
                            </button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-play">
                                <svgPlay />
                            </button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-top type01">
                                <svgTop/>
                            </button>
                        </div>
                        <div class="buttons-list">
                            <button type="button" class="btn-top type02">
                                <svgTop/>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">ETC.</p>
                    <div class="buttons">
                        <div class="buttons-list">
                            <div class="input-form lg">
                                <div class="input-text">
                                    <input type="text" placeholder=".form-select-lg">
                                </div>
                            </div>
                        </div>
                        <div class="buttons-list">
                            <div class="input-form md">
                                <div class="input-text">
                                    <input type="text" placeholder=".form-select-md">
                                </div>
                            </div>
                        </div>
                        <div class="buttons-list">
                            <div class="input-form sm">
                                <div class="input-text">
                                    <input type="text" placeholder=".form-select-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container" id="Tabs">
                <h2 class="title">Tabs</h2>
                <div class="cont">
                    <p class="desc">type01</p>
                    <div class="tab type01 box"> 
                        <div class="tab-list"
                            :class="{ 'is-active': currentTab === index }"
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="tabClick(index)">
                            {{ item }}
                        </div>
                        <div class="tab-highlight" :style="highlightStyle" />
                    </div>
                    <div class="tab-cont">
                        {{ currentTab }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type02</p>
                    <ul class="tab type02 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab02 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab02 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab02 }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type03</p>
                    <ul class="tab type03 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab03 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab03 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab03 }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type04</p>
                    <ul class="tab type04 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab04 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab04 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab04 }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type05</p>
                    <ul class="tab type05 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab05 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab05 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab05 }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type06</p>
                    <ul class="tab type06 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab06 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab06 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab06 }}
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type07</p>
                    <ul class="tab type07 box"> 
                        <li class="tab-list"
                            :class="{'is-active' : currentTab07 === item }" 
                            v-for="(item, index) in menuList" 
                            :key="index" 
                            @click="currentTab07 = item">{{ item }}</li>
                    </ul>
                    <div class="tab-cont">
                        {{ currentTab07 }}
                    </div>
                </div>
            </section>
            <section class="container" id="Pagination">
                <h2 class="title">Pagination</h2>
                <div class="cont">
                    <p class="desc">type01</p>
                    <div class="pagination-container" style="justify-content: flex-start;">
                        <div class="pagination-container-list">
                            <button type="button" class="paginate-buttons" @click="goToFirstPage" :disabled="currentIndex === 1">
                                <img src="/images/icon/icon_chevron_left.png" alt="icon_chevron_left" />
                            </button>
                        </div>
                        <div class="pagination-container-list">
                            <button type="button" class="paginate-buttons" @click="prevPage" :disabled="currentIndex === 1">
                                <img src="/images/icon/icon_prev.png" alt="icon_prev" />
                            </button>
                        </div>
                        <div class="pagination-container-wrap">
                            <div class="pagination-container-list" v-for="(item, index) in pagiList" :key="index">
                                <button type="button" 
                                        class="paginate-buttons" 
                                        :class="{ 'active' : currentIndex === item }" @click="currentIndex = item">{{ item }}</button>
                            </div>
                            <div class="pagination-container-highlight" :style="highlightStyle02" />
                        </div>
                        <div class="pagination-container-list">
                            <button type="button" class="paginate-buttons" @click="nextPage" :disabled="currentIndex === totalPages">
                                <img src="/images/icon/icon_next.png" alt="icon_next" />
                            </button>
                        </div>
                        <div class="pagination-container-list">
                            <button type="button" class="paginate-buttons" @click="goToLastPage" :disabled="currentIndex === totalPages">
                                <img src="/images/icon/icon_chevron_right.png" alt="icon_chevron_right" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">type02</p>
                    <ul class="pagination-container type02" style="justify-content: flex-start;">
                        <li>
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_prev.png" alt="icon_prev" />
                            </button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons active">1</button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons">2</button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons">3</button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
                            </button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_next.png" alt="icon_next" />
                            </button>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="container" id="Breadcrumb">
                <h2 class="title">Breadcrumb</h2>
                <div class="cont">
                    <ul class="gnb">
                        <li class="gnb-list">
                            <a href="" class="gnb-list-link">Home</a>
                        </li>
                        <li class="gnb-list">
                            <a href="" class="gnb-list-link">Category</a>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="container" id="Tables">
                <h2 class="title">Tables</h2>
                <div class="cont">
                    <p class="desc">#01</p>
                    <table>
                        <colgroup>
                            <col width="5%">
                            <col width="10%">
                            <col width="*">
                            <col width="20%">
                            <col width="20%">
                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <div class="check-box">
                                        <input 
                                            type="checkbox" 
                                            id="chk_all"
                                            v-model="allSelected"
                                            @change="toggleAll"
                                            name="chk_all">
                                        <label for="chk_all">
                                            <span class="check-box-item">
                                                <span class="item-blur" />
                                                <i class="item-line" />
                                            </span>
                                        </label>
                                    </div>
                                </th>
                                <th>지역</th>
                                <th>매장명</th>
                                <th>연락처</th>
                                <th>주소</th>
                                <th>날짜</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :class="{ 'is-fixed' : row.fixed }" v-for="(row, index) in tableData" :key="index">
                                <td>
                                    <div class="check-box">
                                        <input
                                        type="checkbox"
                                        :id="`check_${index}`"
                                        v-model="row.checked"
                                        @change="checkIfAllSelected"
                                        />
                                        <label :for="`check_${index}`">
                                        <span class="check-box-item">
                                            <span class="item-blur" />
                                            <i class="item-line" />
                                        </span>
                                        </label>
                                    </div>
                                </td>
                                <td>{{ row.region }}</td>
                                <td>{{ row.name }}</td>
                                <td>{{ row.phone }}</td>
                                <td>{{ row.address }}</td>
                                <td>{{ row.date }}</td>
                                <td>{{ row.value }}</td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
                <div class="cont">
                    <p class="desc">#03</p>
                    <table>
                        <colgroup>
                            <col width="4%">
                            <col width="*">
                            <col width="10%">
                        </colgroup>
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in 5" :key="index">
                                <td>
                                    <div class="check-box">
                                        <input
                                        type="checkbox"
                                        :id="`checkbox_${index}`"
                                        />
                                        <label :for="`checkbox_${index}`">
                                            <span class="check-box-item">
                                                <span class="item-blur" />
                                                <i class="item-line" />
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div class="cont">
                                        <img src="/public/images/default/img_coach_01.png" alt="img_coach_01">
                                        <div class="cont-desc">
                                            <p class="cont-desc-title">골프 인사이드</p>
                                            <ul class="cont-desc-wrap">
                                                <li>서울</li>
                                                <li>02-1234-1234</li>
                                                <li>서울시 영등포구 은행로 11, 5층-6층(여의도동,일신빌딩)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                                <td>25.05.05</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="container" id="Accordion">
                <h2 class="title">Accordion</h2>
                <div class="cont">
                    <p class="desc">#01</p>
                    <div class="table-area" style="overflow: hidden;">
                        <button type="button" class="btn-more" :class="{ 'is-active' : showMore }" @click="showMore = !showMore">
                            <span>스윙정보</span>
                            <img src="/public/images/icon/icon_arrow_down.png" alt="icon_arrow_down">
                        </button>
                        <transition 
                            @before-enter="beforeEnter"
                            @enter="enter" 
                            @before-leave="beforeLeave" 
                            @leave="leave">
                            <div class="table" v-show="showMore" ref="tableRef">
                                <ul class="row"> 
                                    <li class="row-list" v-for="(item, index) in swingInfo" :key="index">
                                        <p class="tit">{{ item.name }}</p>
                                        <div class="info">{{ item.info }}</div>
                                    </li> 
                                </ul>
                            </div> 
                        </transition>
                    </div>
                </div>
            </section>
            <section class="container" id="Alert">
                <h2 class="title">Alert</h2>
                <div class="cont">
                    <p class="desc">알림창</p>
                    <div class="buttons-list">
                        <button type="button" class="btn-md-fill" @click="toastOpen1" :style="{ backgroundColor: `#00B34A` }">확인</button>
                        <button type="button" class="btn-md-fill" @click="toastOpen2" :style="{ backgroundColor: `#F8AD15` }">컨펌(수정)</button>
                        <button type="button" class="btn-md-fill" @click="toastOpen3" :style="{ backgroundColor: `#EF2B49` }">컨펌(삭제)</button>
                        <button type="button" class="btn-md-fill" @click="toastOpen4" :style="{ backgroundColor: `#F8AD15` }">경고</button>
                        <button type="button" class="btn-md-fill" @click="toastOpen5" :style="{ backgroundColor: `#EF2B49` }">에러</button>
                    </div>

                    <!-- 토스트 알림 모달 -->
                    <toast-modal
                        :isOpen="modals.toastModal"
                        :toastMessage="toastMessage"
                        @update:isOpen="modals.toastModal = $event"
                    />

                    <!-- 토스트 삭제 모달 -->
                    <toast-delete-modal
                        :isOpen="modals.toastDeleteModal"
                        :toastDeleteMessage="toastDeleteMessage"
                        @update:isOpen="modals.toastDeleteModal = $event"/>

                    <!-- 토스트 경고 모달 -->
                    <toast-warn-modal 
                        :isOpen="modals.toastWarnModal"
                        :toastWarnMessage="toastWarnMessage"
                        @update:isOpen="modals.toastWarnModal = $event"/>

                    <!-- 토스트 에러 모달 -->
                    <toast-error-modal 
                        :isOpen="modals.toastErrorModal"
                        :toastErrorMessage="toastErrorMessage"
                        @update:isOpen="modals.toastErrorModal = $event"/>

                    <!-- 토스트 컨펌 모달 -->
                    <toast-confirm-modal
                        :isOpen="modals.toastConfirmModal"
                        :toastConfirmMessage="toastConfirmMessage"
                        @confirm="handleConfirm"
                        @update:isOpen="modals.toastConfirmModal = $event"/>

                </div>
            </section>
            <section class="container" id="Modal">
                <h2 class="title">Modal</h2>
                <div class="cont">
                    <p class="desc">모달</p>
                    <div class="buttons-list">
                        <button type="button" class="btn-md-line" @click="modalOpen('modalConfirm')">팝업 1</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalMap')">팝업 2</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalRecommendInfo')">추천정보</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalMemberInfo')">회원정보(작성)</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalMemberInfoView')">회원정보(보기)</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalMailSend')">메일 보내기</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalCallback')">불러오기</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalRecommendActive')">추천운동 상세</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalRecommendActiveRegister')">추천운동 등록</button>
                        <button type="button" class="btn-md-line" @click="modalOpen('modalPreview')">미리보기</button>
                    </div>
                </div>
                <modal-confirm :isOpen="modals.modalConfirm" @update:isOpen="modals.modalConfirm = $event"/>
                <modal-map :isOpen="modals.modalMap" @update:isOpen="modals.modalMap = $event"/>
                <modal-recommend-info :isOpen="modals.modalRecommendInfo" @update:isOpen="modals.modalRecommendInfo = $event"/>
                <modal-member-info :isOpen="modals.modalMemberInfo" @update:isOpen="modals.modalMemberInfo = $event"/>
                <modal-member-info-view :isOpen="modals.modalMemberInfoView" @update:isOpen="modals.modalMemberInfoView = $event"/>
                <modal-mail-send :isOpen="modals.modalMailSend" @update:isOpen="modals.modalMailSend = $event"/>
                <modal-callback :isOpen="modals.modalCallback" @update:isOpen="modals.modalCallback = $event"/>
                <modal-recommend-active :isOpen="modals.modalRecommendActive" @update:isOpen="modals.modalRecommendActive = $event"/>
                <modal-recommend-active-register :isOpen="modals.modalRecommendActiveRegister" @update:isOpen="modals.modalRecommendActiveRegister = $event"/>
                <modal-preview :isOpen="modals.modalPreview" @update:isOpen="modals.modalPreview = $event"/>
            </section>
            <section class="container" id="Chart">
                <h2 class="title">Chart</h2>
                <div class="cont">
                    <p class="desc">차트(line) - type01</p>
                    <div class="chart-list">
                        <chart-e-chart></chart-e-chart>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(line) - type01</p>
                    <div class="chart-list">
                        <chart-line-type-2></chart-line-type-2>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(line) - type02</p>
                    <div class="chart-list">
                        <chart-line-type-3></chart-line-type-3>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(line) - type03</p>
                    <div class="chart-list">
                        <chart-line-type-4></chart-line-type-4>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(bar) - type01</p>
                    <div class="chart-list">
                        <chart-bar-vertical />
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(bar) - type02</p>
                    <div class="chart-list">
                        <chart-bar-vertical-side />
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(bar) - type03</p>
                    <div class="chart-list">
                        <chart-bar-vertical-stack-level-4 />
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(bar) - type05</p>
                    <div class="chart-list">
                        <chart-bar-vertical />
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(doughnut)</p>
                    <div class="chart-list">
                        <chart-doughnut />
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(radar) - type01</p>
                    <div class="chart-list">
                        <chart-radar></chart-radar>
                    </div>
                </div>
                <div class="cont">
                    <p class="desc">차트(radar) - type02</p>
                    <div class="chart-list">
                        <chart-radar-chart></chart-radar-chart>
                    </div>
                </div>
            </section>
       </main>
       <button type="button" class="btn-scroll-top" v-if="topBtn" @click="topScroll">
        <svgArrow />
       </button>
    </div>
</template>
<script setup> 
import { onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core';
import svgArrow from '@/components/svg/svgArrow.vue';
import svgPlay from '@/components/svg/svgPlay.vue';
import svgTop from '@/components/svg/svgTop.vue';
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastConfirmModal from '@/components/toast-ui/toast-confirm-modal.vue';
import toastDeleteModal from '@/components/toast-ui/toast-delete-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';

const gnbList = [
    {
        name: 'Colors'
    },
    {
        name: 'Tyopgraphy'
    },
    {
        name: 'Icons'
    },
    {
        name: 'Forms'
    },
    {
        name: 'Buttons'
    },
    {
        name: 'Tabs'
    },
    {
        name: 'Pagination'
    },
    {
        name: 'Breadcrumb'
    },
    {
        name: 'Tables'
    },
    {
        name: 'Accordion'
    },
    {
        name: 'Alert'
    },
    {
        name: 'Modal'
    },
    {
        name: 'Chart'
    }
]

const PrimaryColor = [
    {
        color: '034B5E'
    },
    {
        color: '298097'
    },
    {
        color: 'F8AD15'
    }
]

const IndicatationColor = [
    {
        color: '00B34A'
    },
    {
        color: 'EF2B49'
    },
    {
        color: 'FFC107'
    }
]

const GrayscaleColor = [
    {
        color: 'F8F9FA',
        name: 'Background'
    },
    {
        color: 'E5E7E8',
        name: 'Line'
    },
    {
        color: 'CDCFD1'
    },
    {
        color: 'ADB0B3',
    },
    {
        color: '9B9FA3'
    },
    {
        color: '676D73'
    },
    {
        color: '52575C',
        name: 'Text-Body'
    },
    {
        color: '35383B',
        name: 'Border-Type'
    },
    {
        color: '14171A',
        name: 'Text-Title'
    },
    {
        color: '000000'
    }
]

const AccentColor = [
    {
        color: '3577F1',
        name: 'Blue'
    },
    {
        color: '0033A1',
        name: 'Indigo'
    },
    {
        color: '552BB6',
        name: 'Purple'
    },
    {
        color: 'CE2F92',
        name: 'Pink'
    },
    {
        color: 'FF7519',
        name: 'Orange'
    },
    {
        color: '22BBBB',
        name: 'Cyan'
    },
    {
        color: 'CDEA35',
        name: 'Lime'
    }
]

const iconList = [
    {
        name: 'icon_check'
    },
    {
        name: 'icon_check_fill'
    },
    {
        name: 'icon_eye'
    },
    {
        name: 'icon_heart_fill'
    },
    {
        name: 'icon_heart_line'
    },
    {
        name: 'icon_comment_fill'
    },
    {
        name: 'icon_comment_line'
    },
    {
        name: 'icon_star_fill'
    },
    {
        name: 'icon_star_line'
    },
    {
        name: 'icon_close'
    },
    {
        name: 'icon_arrow_down'
    },
    {
        name: 'icon_arrow_up'
    },
    {
        name: 'icon_arrow_prev'
    },
    {
        name: 'icon_arrow_next'
    },
    {
        name: 'icon_plus'
    },
    {
        name: 'icon_minus'
    },
    {
        name: 'icon_video_camera'
    },
    {
        name: 'icon_share'
    },
    {
        name: 'icon_calendar'
    },
    {
        name: 'icon_search'
    },
    {
        name: 'icon_location'
    },
    {
        name: 'icon_flag'
    },
    {
        name: 'icon_call'
    },
    {
        name: 'icon_my_location'
    },
    {
        name: 'icon_explore_fill'
    },
    {
        name: 'icon_explore_line'
    },
    {
        name: 'icon_information'
    },
    {
        name: 'icon_clip'
    },
    {
        name: 'icon_time_fill'
    },
    {
        name: 'icon_time_line'
    },
    {
        name: 'icon_flag_hole'
    },
    {
        name: 'icon_power'
    },
    {
        name: 'icon_manage_accounts'
    },
    {
        name: 'icon_list'
    },
    {
        name: 'icon_sort'
    },
    {
        name: 'icon_link'
    },
    {
        name: 'icon_sns_youtube'
    },
    {
        name: 'icon_sns_medium'
    },
    {
        name: 'icon_sns_facebook'
    },
    {
        name: 'icon_sns_instagram'
    }
]

// 스크롤 진행 상태 바 이벤트
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
}

// 2024.12.18[cgnoh]: 스크롤 이벤트
const scrollTo = (sectionId, event) => {
  const targetSection = document.getElementById(sectionId);

  const menuLink = document.querySelectorAll("nav > dl > dd > a");
  menuLink.forEach((item) => {
    item.classList.remove("is-active");
  });

  event.target.classList.add("is-active");

  if (targetSection) {

    // 현재 스크롤 위치와 목표 위치 계산
    const offset = 200; // 원하는 오프셋 값
    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;

    // 부드럽게 이동
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

  }
};

// 컬러값 복사 이벤트
const colorMessageShow = ref(false);
const colorMessage = ref(null);
const colorCopy = (value) => {
    const copyText = value;
    const copyArea = document.createElement('textarea');

    copyArea.value = copyText;
    document.body.appendChild(copyArea);
    copyArea.select();
    document.execCommand('copy');
    document.body.removeChild(copyArea);
    colorMessageShow.value = true;
    colorMessage.value = `${copyText} 복사완료!`

    setTimeout(() => {
        colorMessageShow.value = false;
        colorMessage.value = '';
    }, 500);
}

// 아이콘 복사 이벤트
const iconCopy = (value) => {
    const copyText = value;
    const copyArea = document.createElement('textarea');

    copyArea.value = `<img src="/images/icons/${copyText}.png">`;
    document.body.appendChild(copyArea);
    copyArea.select();
    document.execCommand('copy');
    document.body.removeChild(copyArea);
    colorMessageShow.value = true;
    colorMessage.value = `${copyText} 복사완료!`

    setTimeout(() => {
        colorMessageShow.value = false;
        colorMessage.value = '';
    }, 500);
}

const modals = reactive({
    toastModal: false,
    modalSample: false
});

// 토스트 확인 모달
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 토스트 삭제 모달
const toastDeleteMessage = ref();
const handleDeleteToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastDeleteModal'] = true;
    toastDeleteMessage.value = message;
}

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = message;
}

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastWarnModal'] = true;
    toastWarnMessage.value = message;
}

// 토스트 컨펌 모달
const toastConfirmMessage = ref();
const handleConfirmToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastConfirmModal'] = true;
    toastConfirmMessage.value = message;
}

const handleConfirm = (confirm) => {
    console.log(confirm)
}

const toastOpen1 = () => {
    handleToast('확인 모달입니다.')
}

const toastOpen2 = () => {
    handleConfirmToast('컨펌 수정모달입니다.')
}

const toastOpen3 = () => {
    handleDeleteToast('컨펌 삭제모달입니다.')
}

const toastOpen4 = () => {
    handleWarnToast('경고 모달입니다.')
}

const toastOpen5 = () => {
    handleErrorToast('에러 모달입니다.')
}

const optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

// 2024.12.30[cgnoh]: 셀렉트 박스 보여줌 여부
const selectShow1 = ref(false);
const selectShow2 = ref(false);
const selectShow3 = ref(false);

// 2024.12.30[cgnoh]: 셀렉트 박스
const inputContRef = ref();

// 2024.12.30[cgnoh]: 외부 클릭 이벤트
onClickOutside(inputContRef, event => {
    const parent = event.target.closest('.input-text');

    if(parent === null) {
        selectShow1.value = false;
        selectShow2.value = false;
        selectShow3.value = false;
    }
});

// 2024.12.30[cgnoh]: 셀렉트 받는 값
const inputItems1 = ref([]);
const inputItems2 = ref([]);
const inputItems3 = ref([]);

// 2024.12.30[cgnoh]: 셀렉트 보내는 값
const selectInput1 = computed(() => {
    return inputItems1.value;
});

const selectInput2 = computed(() => {
    return inputItems2.value;
});

const selectInput3 = computed(() => {
    return inputItems3.value;
});

// 2024.12.31[cgnoh]: 메뉴 리스트
const menuList = ['TAB1','TAB2','TAB3'];

// 2025.02.27[cgnoh]: 동적 클래스 바인딩 (하이라이트 바 위치 조정)
const currentTab = ref(0); // 현재 선택된 탭 인덱스
const highlightStyle = computed(() => ({
    width: `${100 / menuList.length}%`,  // 동적으로 너비 조정
    left: `${(100 / menuList.length) * currentTab.value}%`
}));
const tabClick = (index) => {
  currentTab.value = index;
};

const currentTab02 = ref('TAB1');
const currentTab03 = ref('TAB1'); 
const currentTab04 = ref('TAB1'); 
const currentTab05 = ref('TAB1');
const currentTab06 = ref('TAB1');
const currentTab07 = ref('TAB1');

// 2024.12.31[cgnoh]: 페이지 리스트
const pagiList = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

const currentIndex = ref(1); // 현재 페이지
const totalPages = ref(10); // 총 페이지 수

const highlightStyle02 = computed(() => ({
    width: `${100 / totalPages.value}%`,  // totalPages.value 사용
    left: `${(100 / totalPages.value) * (currentIndex.value - 1)}%` // 0부터 시작해야 함
}));

// 2025.02.27[cgnoh]: 첫 페이지로 이동
const goToFirstPage = () => {
  setPage(1);
}

// 2025.02.27[cgnoh]: 이전 페이지 이동
const prevPage = () => {
  setPage(currentIndex.value - 1);
}

// 2025.02.27[cgnoh]: 다음 페이지 이동
const nextPage = () => {
  setPage(currentIndex.value + 1);
}

// 2025.02.27[cgnoh]: 마지막 페이지로 이동
const goToLastPage = () => {
    setPage(totalPages.value);
}

const setPage = (page) => {
    if(page < 1 || page > totalPages.value) return;
    currentIndex.value = page;
}

// 2024.12.20[cgnoh]: 탑버튼 이벤트
const topScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 부드럽게 스크롤
  });
};

// 2024.12.19[cgnoh]: 스크롤 이벤트 핸들러
const topBtn = ref(false);
const scrollPosition = ref(0);
const gnbListlink = ref();
const handleScroll = () => {
  topBtn.value = window.scrollY > 100; // 스크롤 위치가 100px 이상이면 버튼 표시

  // 스크롤 위치 가져오기
  scrollPosition.value = window.scrollY;

  gnbListlink.value.forEach((item) => {
    item.classList.remove("is-active");

    const section = document.querySelector(`#${item.dataset.sectionId}`);

    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const activationThresholdTop = sectionTop - 300;
      const activationThresholdBottom = sectionBottom - 300;

      if (
        scrollPosition.value >= activationThresholdTop &&
        scrollPosition.value <= activationThresholdBottom
      ) {
        item.classList.add("is-active");
      }
    }
  });
};

// 2025.02.27[cgnoh]: 검색박스 이벤트
const inputSearch = ref('');
const isClose = ref(false);

const handleInputSearch = () => {
    inputSearch.value = '';
    isClose.value = false;
}

const handleInput = () => {
    if(inputSearch.value !== '') {
        isClose.value = true;
    }
}

const handleMenu = ref(false);

// 2025.05.09[cgnoh]: 체크박스 전체선택 이벤트
const tableData = ref([
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: true
  },
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: false
  },
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: false
  },
]);

const allSelected = ref(false)

const toggleAll = () => {
    tableData.value.forEach((row) => {
    row.checked = allSelected.value
  })
}

const checkIfAllSelected = () => {
    allSelected.value = tableData.value.every((row) => row.checked)
}

// 2025.05.09[cgnoh]: 모달 열기 이벤트
const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector('body').classList.add('is-hidden');
};

const swingInfo = [
    {
        name: '클럽정보',
        info: 'I7',
    },
    {
        name: '볼속도',
        info: '97.5',
    },
    {
        name: '백스핀',
        info: '3244'
    },
    {
        name: '캐리',
        info: '188',
    },
    {
        name: '클럽속도',
        info: '77.5',
    },
    {
        name: '볼방향',
        info: '0.2',
    },
    {
        name: '사이드스핀',
        info: '-29',
    },
    {
        name: '비거리',
        info: '210',
    },
    {
        name: '클럽진입각',
        info: '10.5',
    },
    {
        name: '탈출각',
        info: '20.5',
    },
    {
        name: '구질',
        info: 'Push Straight',
    },
    {
        name: '티높이',
        info: '55'
    }
]
const showMore = ref(false);

const tableRef = ref(null);
const beforeEnter = (el) => {
  el.style.height = '0';
}

const enter = (el) => {
  el.style.transition = 'all 0.3s ease';
  el.style.height = el.scrollHeight + 'px';
}

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
}

const leave = (el) => {
  el.style.transition = 'all 0.3s ease';
  el.style.height = '0';
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  window.addEventListener("scroll", handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener("scroll", handleScroll);
})

definePageMeta({
  layout: 'empty',
});

</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/guide.scss';
</style>
