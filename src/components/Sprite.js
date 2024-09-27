import React from 'react';
import { useDispatch } from 'react-redux';
import CatSprite from '../sprites/CatSprite';
import DogSprite from '../sprites/DogSprite';
import BirdSprite from '../sprites/BirdSprite';
import { selectSprite } from '../redux/spritesSlice';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites';

export const SpriteImage = ({ spriteName, styles, handleClick }) => {
    switch (spriteName) {
        case "cat":
            return <CatSprite styles={styles} onClick={handleClick} />
        case "dog":
            return <DogSprite styles={styles} onClick={handleClick} />
        case "bird":
            return <BirdSprite styles={styles} onClick={handleClick} />
        default:
            return <></>
    }
}
const Sprite = ({ sprite }) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(selectSprite(sprite.id))
    }
    return (
        <div
            className="sprite absolute transition-transform duration-400"
            style={{
                transform: `translate(${sprite.position.x}px, ${sprite.position.y}px) rotate(${sprite.rotation}deg)`,
            }}
        >
            <SpriteImage spriteName={sprite.name} handleClick={handleClick} styles={{ width: SPRITE_WIDTH + "px", height: SPRITE_HEIGHT + "px" }} />
        </div>
    );
};

export default Sprite;
