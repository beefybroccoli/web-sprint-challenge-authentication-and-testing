const helper = require("./helper");

const varString = 'string';
const varEmptyString = "";
const varNumber = 15;
const varObj = {'key':'value'};
const varArray = [ 'key1', 'key2'];
const varEmptyArray = [];
let varUndefined;

describe('[1] - test isUndefined', ()=>{

    it('[1-1] - isUndefined return true for undefined variable', ()=>{
        expect(helper.isUndefined(varUndefined)).toBe(true);
    })
    it('[1-2] - isUndefined return false for a defined variable', ()=>{
        expect(helper.isUndefined(varString)).toBe(false);
    })
})

describe('[2] - describe isString function', ()=>{
    it('[2-1] - isString return true for a string', () => {
        expect(helper.isString(varString)).toBe(true);
    })
    it('[2-2] - isString return false for a number', () => {
        expect(helper.isString(varNumber)).toBe(false);
    })
    it('[2-3] - isString return false for an object', () => {
        expect(helper.isString(varObj)).toBe(false);
    })
    it('[2-4] - isString return false for an array', () => {
        expect(helper.isString(varArray)).toBe(false);
    })
})

describe('[3] - describe isEmptyString', ()=>{
    it('[3-1 - isEmptyString return true for an empty string', ()=>{
        expect(helper.isEmptyString(varEmptyString)).toBe(true);
    })
    it('[3-2 - isEmptyString return false for a string', ()=>{
        expect(helper.isEmptyString(varString)).toBe(false);
    })
    it('[3-3 - isEmptyString return false for a number', ()=>{
        expect(helper.isEmptyString(varNumber)).toBe(false);
    })
    it('[3-4 - isEmptyString return false for an object', ()=>{
        expect(helper.isEmptyString(varObj)).toBe(false);
    })
    it('[3-5 - isEmptyString return false for an undefined object', ()=>{
        expect(helper.isEmptyString(varUndefined)).toBe(false);
    })
    //???????????????????????????????????????????????????????????????
    //?????? Why is test 3-6 light up like a christmas tree ?????????
    it('[3-6 - isEmptyString return false for an undefined object', ()=>{
        expect(helper.isEmptyString(varUndefineddd)).toBe(false);
    })
    //???????????????????????????????????????????????????????????????
    it('[3-7 - isEmptyString return false for an array', ()=>{
        expect(helper.isEmptyString(varArray)).toBe(false);
    })
    it('[3-8 - isEmptyString return false for an empty array', ()=>{
        expect(helper.isEmptyString(varEmptyArray)).toBe(false);
    })
})