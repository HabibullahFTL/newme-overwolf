import React from 'react';
import { DesktopLayout } from './components/Layouts/DekstopLayout/DesktopLayout';
import DesktopHeader from './DesktopHeader';
import { MapScreen } from './screens/DesktopScrens';

export default function Desktop() {

    return (
        <div className="overflow-hidden h-screen">
            <DesktopHeader />
            <div style={{ height: "calc(100vh - 32px)" }} className="overflow-hidden">
                <DesktopLayout>
                    <MapScreen />
                </DesktopLayout>
            </div>
        </div>
    );
}
