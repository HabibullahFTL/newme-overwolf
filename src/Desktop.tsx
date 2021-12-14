import React from 'react';
import DesktopHeader from './DesktopHeader';
import { MapScreen } from './screens/DesktopScrens';

export default function Desktop() {

    return (
        <div className="overflow-hidden h-screen">
            <DesktopHeader />
            <div style={{ height: "calc(100vh - 32px)" }} className="overflow-hidden">
                <MapScreen />
            </div>
        </div>
    );
}
