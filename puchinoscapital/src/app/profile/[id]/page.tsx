'use client';
import React, { useEffect, useRef } from 'react';
import '../../../styles/profile.css'

import * as echarts from 'echarts';

const ProfilePage = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    return (

        <div className="profile-container">

            <div className="profile-details">

                <div className="first-container">

                    {/* <div className='R41N-chart'>

                        <div className='title'>

                            <h1>$R41N</h1>

                        </div>

                        <div className='chart' ref={chartContainerRef} style={{ width: '100%', height: '300px' }}></div>

                    </div> */}

                </div>

                <div className="second-container">

                    <div className="weekly-module">

                        <div className="title">

                            <h1>Weekly Airdrop</h1>

                        </div>

                        <div className="content">
                        </div>

                    </div>

                    <div className='digital-card'>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ProfilePage;