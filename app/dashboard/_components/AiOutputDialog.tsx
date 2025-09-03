import React from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

export default function AiOutputDialog({ openDialog,closeDialog,orgImage,genImage }) {
    return (
        <AlertDialog open={openDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Result:</AlertDialogTitle>
                    <ReactBeforeSliderComponent
                        firstImage={{imageUrl: orgImage}}
                        secondImage={{imageUrl: genImage}}
                    />
                    <Button onClick={()=>closeDialog()}>Close</Button>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
