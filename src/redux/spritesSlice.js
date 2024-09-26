import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
const id1 = uuid()
const id2 = uuid()
const initialState = {
    sprites: [
        {
            id: id1,
            name: "cat",
            position: { x: 0, y: 0 },
            rotation: 0,
            actions: [],
            repeatIntervalId: null,
        },
        {
            id: id2,
            name: "dog",
            position: { x: 140, y: 0 },
            rotation: 0,
            actions: [],
            repeatIntervalId: null,
        }
    ],
    selectedSpriteId: id1,
};

const spritesSlice = createSlice({
    name: 'sprites',
    initialState,
    reducers: {
        addSprite: (state, action) => {
            state.sprites.push({
                id: action.payload.id,
                name: action.payload.name,
                position: { x: 0, y: 0 },
                rotation: 0,
                actions: [],
                repeatIntervalId: null,
            });
            state.selectedSpriteId = action.payload.id
        },
        selectSprite: (state, action) => {
            state.selectedSpriteId = action.payload;
        },
        addActionToSprite: (state, action) => {
            const { spriteId, actionType, payload } = action.payload;
            const sprite = state.sprites.find(sprite => sprite.id === spriteId);
            if (sprite) {
                sprite.actions.push({ type: actionType, payload });
            }
        },
        move: (state, action) => {
            const { steps, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            for (let i = 0; i < steps; i++) {
                sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * steps;
                sprite.position.y += Math.sin((sprite.rotation * Math.PI) / 180) * steps;
            }
        },
        goTo: (state, action) => {
            const { x, y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * x;
            sprite.position.y += Math.sin((sprite.rotation * Math.PI) / 180) * y;
        },
        rotate: (state, action) => {
            const { degree, spriteId } = action.payload;
            console.log(action)
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.rotation += degree;
        },
        deleteAction: (state, action) => {
            const { index } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId)
            sprite.actions.splice(index, 1)
        },
        updateIntervalId: (state, action) => {
            const { spriteId, repeatIntervalId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.repeatIntervalId = repeatIntervalId;
        },
    },
});

export const { addSprite, selectSprite, deleteAction, updateIntervalId, goTo, move, rotate, updateRepeatPayload, addActionToSprite, playAllSprites } = spritesSlice.actions;

export default spritesSlice.reducer;
