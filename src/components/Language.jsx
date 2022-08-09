import React, { useState, state } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { t } from 'i18next'
import i18 from '../local/index'
export default function language() {
    const onClick = ({ key }) => {
        localStorage.setItem('flag',flag)
        localStorage.setItem('lang', key)
        history.go(0)
    };
    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: '简体中文',
                    key: 'zh',
                   
                },
                {
                    label: 'English',
                    key: 'en',
                    
                },

            ]}
        />
    );
    return (
        <div>
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {/* <div>{t('login.tips', { name: 'Tony' })}</div> */}
                        {localStorage.getItem('lang')=='en' ? <svg t="1659775139841" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2381" width="20" height="20"><path d="M219.4 363.4c11.8 35 31.4 65.4 58.7 92.2 23.2-25.2 40.7-56.2 52-92.2H219.4z m722.2-207.1H508.9L484.2 23.9H82.4C38.1 23.9 2 60 2 104.3v683.1c0 44.3 36.1 80.4 80.4 80.4h366.3l-29.4 132.4h522.4c44.3 0 80.4-36.1 80.4-80.4V236.7c-0.1-44.4-36.2-80.4-80.5-80.4zM396.1 562.2c-47.4-17.5-86.5-39.7-118-65.4-33 29.4-74.2 51-122.1 64.4l-16.5-27.3c46.9-12.4 86-30.9 116.9-57.2-31.9-32.5-54.1-70.1-66.5-112.8h-44.8V333H262c-7.2-13.4-16.5-26.3-27.3-38.6l30.9-11.3c10.8 13.9 20.6 30.4 29.4 49.5h111.8v30.9H362c-14.4 44.3-35 81.4-62.3 111.3 30.4 24.2 68.5 44.3 113.3 60.8l-16.9 26.6z m585.7 357c0 22.2-18 40.2-40.2 40.2H469.8l20.1-92.2h150.9l-86-479.6-0.5 2.6-3.6-19.1 1 0.5-31.4-175.2h421.9c22.2 0 40.2 18 40.2 40.2v682.6h-0.6zM655.2 540.1H766v-29.4H655.2V452h118v-29.4H620.7v211.2h157.1v-29.4H655.2v-64.3z m231.3-63.4c-9.3 0-17.5 1.5-25.2 5.7-7.2 3.6-14.4 9.3-20.1 16.5v-18h-33.5v153h33.5v-92.2c1-12.4 5.2-21.6 12.4-28.3 6.2-5.7 13.4-8.8 21.6-8.8 23.2 0 34.5 12.4 34.5 37.6v91.2h33.5V539c1-41.7-18.6-62.3-56.7-62.3z" p-id="2382"></path></svg> : <svg t="1659775091759" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2237" data-spm-anchor-id="a313x.7781069.0.i1" width="20" height="20"><path d="M579.584 478.208h-9.728l37.376 207.872c24.576-8.704 47.104-22.016 67.072-39.424-20.48-24.576-36.864-52.224-49.664-81.408l39.424-5.12c10.752 22.016 23.04 41.984 37.376 58.88 29.184-35.328 51.2-82.432 67.072-141.312l-188.928 0.512z m148.992 168.448c22.528 19.456 48.128 33.792 76.8 42.496l17.92 5.632-10.752 38.4-17.92-5.632c-34.304-10.752-66.048-28.672-93.184-52.736-25.088 22.528-54.784 39.936-87.04 50.688l25.088 140.288H489.984l-19.968 91.648H939.52c22.016 0 39.936-17.92 39.936-39.936V238.592c0-22.016-17.92-39.936-39.936-39.936H520.192l31.232 174.08-1.024-0.512 3.584 18.944 0.512-2.56 8.704 49.664h96.768v-39.936h74.752v39.936h124.928v39.936h-52.224c-17.408 70.144-44.032 126.464-78.848 168.448zM449.024 865.28H84.992c-44.032 0-79.872-35.84-79.872-79.872v-678.4c0-44.544 35.84-79.872 79.872-79.872h399.36l24.576 131.584h430.08c44.032 0 79.872 35.84 79.872 79.872v678.912c0 44.032-35.84 79.872-79.872 79.872H420.352l28.672-132.096z m-188.416-307.2v-41.984H181.76v-61.952h73.216v-41.472H181.76v-52.736h78.848v-41.472H135.68V558.08h124.928z m192.512 0V438.272c0-21.504-5.12-38.4-14.848-50.176-9.728-11.776-24.576-17.408-44.032-17.408-11.264 0-21.504 2.048-30.208 6.656s-15.872 11.776-20.48 20.48h-2.56l-6.144-23.552h-34.816V558.08h45.056v-86.528c0-21.504 3.072-36.864 8.704-46.592 5.632-9.216 14.848-13.824 27.648-13.824 9.216 0 15.872 3.072 20.48 9.728 4.096 6.656 6.656 16.384 6.656 29.696v107.52h44.544z" p-id="2238"></path></svg>}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}









