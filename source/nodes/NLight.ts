/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import NTransform from "./NTransform";
import CLight from "../components/CLight";

////////////////////////////////////////////////////////////////////////////////

export default class NLight extends NTransform
{
    static readonly type: string = "NLight";

    get light() {
        return this.components.get(CLight);
    }
}