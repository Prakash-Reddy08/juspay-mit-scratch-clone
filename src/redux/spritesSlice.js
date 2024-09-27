import { createSlice } from '@reduxjs/toolkit';
import allSprites from '../constants/sprites'
const initialState = {
    sprites: [
        allSprites[0]
    ],
    selectedSpriteId: allSprites[0].id,
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
            });
            state.selectedSpriteId = action.payload.id
        },
        selectSprite: (state, action) => {
            state.selectedSpriteId = action.payload;
        },
        addActionToSprite: (state, action) => {
            const { spriteId, actionType, actionText, payload } = action.payload;
            const sprite = state.sprites.find(sprite => sprite.id === spriteId);
            if (sprite) {
                sprite.actions.push({ type: actionType, text: actionText, payload });
            }
        },
        move: (state, action) => {
            const { steps, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * steps;
                sprite.position.y += Math.sin((sprite.rotation * Math.PI) / 180) * steps;
            }
        },
        goTo: (state, action) => {
            const { x, y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.position.x = x;
            sprite.position.y = y;
        },
        rotate: (state, action) => {
            const { degree, spriteId } = action.payload;
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
