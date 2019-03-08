/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as THREE from "three";

import { types } from "@ff/graph/propertyTypes";

import CMaterial from "./CMaterial";

////////////////////////////////////////////////////////////////////////////////

export default class CBasicMaterial extends CMaterial
{
    static readonly typeName: string = "CBasicMaterial";

    protected static readonly ins = {
        color: types.ColorRGB("Basic.Color"),
        opacity: types.Percent("Basic.Opacity", 1),
    };

    ins = this.addInputs<CMaterial, typeof CBasicMaterial.ins>(CBasicMaterial.ins, 0);

    get material() {
        return this._material as THREE.MeshBasicMaterial;
    }

    create()
    {
        this._material = new THREE.MeshBasicMaterial();
        super.create();
    }

    update()
    {
        super.update();

        const material = this.material;
        const ins = this.ins;

        if (ins.color.changed || ins.opacity.changed) {
            const rgb  = ins.color.value;
            material.color.setRGB(rgb[0], rgb[1], rgb[2]);
            material.opacity = ins.opacity.value;
        }

        return true;
    }
}