/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as THREE from "three";

import Component, { types } from "@ff/graph/Component";

////////////////////////////////////////////////////////////////////////////////

export { types };

export enum EBlending { Off, Normal, Additive, Subtractive, Multiply, Custom }

const _THREE_BLENDING = [
    THREE.NoBlending,
    THREE.NormalBlending,
    THREE.AdditiveBlending,
    THREE.SubtractiveBlending,
    THREE.MultiplyBlending,
    THREE.CustomBlending,
];

export enum EDepthFunction { Never, Always, Less, LessEqual, GreaterEqual, Greater, NotEqual }

const _THREE_DEPTH_FUNCTION = [
    THREE.NeverDepth,
    THREE.AlwaysDepth,
    THREE.LessDepth,
    THREE.LessEqualDepth,
    THREE.GreaterEqualDepth,
    THREE.GreaterDepth,
    THREE.NotEqualDepth
];

export enum ESide { Front, Back, Double }

const _THREE_SIDE = [
    THREE.FrontSide,
    THREE.BackSide,
    THREE.DoubleSide,
];

export default class CMaterial extends Component
{
    static readonly typeName: string = "CMaterial";

    protected static readonly matIns = {
        side: types.Enum("Material.Side", ESide, ESide.Front),
        blending: types.Enum("Material.Blending", EBlending, EBlending.Normal),
        transparent: types.Boolean("Material.Transparent"),
        flat: types.Boolean("Material.Flat", false),
        lights: types.Boolean("Material.Lights", true),
        fog: types.Boolean("Material.Fog", true),
        writeColor: types.Boolean("Material.WriteColor", true),
        writeDepth: types.Boolean("Material.WriteDepth", true),
        testDepth: types.Boolean("Material.DepthTest", true),
        depthFunc: types.Enum("Material.DepthFunction", EDepthFunction, EDepthFunction.LessEqual),
    };

    protected static readonly matOuts = {
        self: types.Object("Material", CMaterial),
    };

    ins = this.addInputs(CMaterial.matIns);
    outs = this.addOutputs(CMaterial.matOuts);

    protected _material: THREE.Material = null;

    get material() {
        return this._material;
    }

    create()
    {
        this.outs.self.setValue(this);
    }

    update()
    {
        const material = this._material;
        const ins = this.ins;

        if (ins.side.changed) {
            material.side = _THREE_SIDE[ins.side.getValidatedValue()];
        }
        if (ins.blending.changed || ins.transparent.changed || ins.flat.changed || ins.lights.changed || ins.fog.changed) {
            material.blending = _THREE_BLENDING[ins.blending.getValidatedValue()];
            material.transparent = ins.transparent.value;
            material.flatShading = ins.flat.value;
            material.lights = ins.lights.value;
            material.fog = ins.fog.value;
        }
        if (ins.writeColor.changed || ins.writeDepth.changed || ins.testDepth.changed || ins.depthFunc.changed) {
            material.colorWrite = ins.writeColor.value;
            material.depthWrite = ins.writeDepth.value;
            material.depthTest = ins.testDepth.value;
            material.depthFunc = _THREE_DEPTH_FUNCTION[ins.depthFunc.getValidatedValue()];
        }

        return true;
    }

    dispose()
    {
        this._material.dispose();
        super.dispose();
    }
}