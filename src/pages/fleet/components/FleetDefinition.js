import {useFormContext} from "react-hook-form";
import {Card, Label} from "flowbite-react";
import SearchWork from "./SearchWork";
import React from "react";

function FleetDefinition() {
    return (
        <>
            <Card className="max-w-sm">
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="Work"/>
                        </div>
                        <SearchWork/>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default FleetDefinition;