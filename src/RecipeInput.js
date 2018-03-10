import React, {Component} from 'react';
import './RecipeInput.css';
//instructions
//state desires title
//instructions for recipe
//array of ingredients
//image for recipe.

/* Ideally you should strive to minimize the amount of state that different components have, but sometimes (especially for things like inputs/forms) 
you will need your own state for that component. 
*/

/*--------------------STATE----------------------------- */

//state can only live in RecipeApp compponent.
//But RecipeInput is the one who controls changes to form.

//Solution: RecipeApp passes callback to RecipeInput

//handleSubmit prevents default behavior.
//and invoke unsaved callback.

class RecipeInput extends Component {
    
    static defaultProps= {
        onClose() {}, //onclose method passed in as a prop.
        onSave() {}
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        };
        this.handleChange = this.handleChange.bind(this) //used by multiple inputs.
        this.handleNewIngredients = this.handleNewIngredients.bind(this)
        this.handleChangeIng = this.handleChangeIng.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) { //method uses setstate
        this.setState({[e.target.name]:e.target.value}) //handles keys.
    }
    
    handleNewIngredients(e) {
        const {ingredients} = this.state;
        this.setState({ingredients: [...ingredients, '']});
        /*
        without spread operator - assign the val to a variable adn then call function with those variaables as args.
        in an obj. 
        handleSubmit(e) {
        e.preventDefault();    
        let title= this.state.title;
        let instructions = this.state.instructions;
        let ingredients = this.stae.ingredients;
        let img = this.state.img;
        this.props.onSave({title, instructions, ingredients, img})
        this.setState({
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        })
        }
        
        
        */
    }
    
    handleChangeIng(e) {
        //figures index we get target.
        const index = Number(e.target.name.split('-')[1]);
        //name input form: ingredients - index.
        //index is second ele on arr with [1].
        //cast to number.
        //complete!
        const ingredients = this.state.ingredients.map((ing, i)=> (
            i === index ? e.target.value : ing
            //compare old and new idx. 
            //return new or old val.
        ));
        this.setState({ingredients});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        //invoke onSave with vals on current form.
        
        this.props.onSave({...this.state});
        //clear form after recipe saved
        this.setState({
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        })
    }
    
    render() {
        //destructure
        const {title, instructions, img, ingredients} = this.state;
        const {onClose} = this.props;
        let inputs = ingredients.map((ing, i)=>
        (<div
        className="recipe-form-line"
        key={`ingredient-${i}`}
        >
            <label>{i+1}.
                <input
                type="text"
                name={`ingredient-${i}`}
                value={ing}
                size={45}
                autoComplete="off"
                placeholder=" Ingredient"
                onChange={this.handleChangeIng} //get from name, mod the appropriate position.
                />
            </label>
        </div>
        ));
        
        return (
            <div className = "recipe-form-container"> 
            <form className="recipe-form" onSubmit={this.handleSubmit}> 
            <button
                type="button"
                className="class-button"
                onClick={onClose}
                >
                X
            </button>
            
            <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Title</label>
            <input
                id="recipe-title-input"
                key="title"
                name="title"
                type="text"
                value={title}
                size={42}
                autoComplete="off"
                onChange={this.handleChange}/>
            />
            </div>
            
            <label
                htmlFor="recipe-instructions-input"
                style={{marginTop:'5px'}}
            >
            Instructions
            </label>
            
            <textarea
                key="instructions"
                id="recipe-instructions-input"
                type="Instructions"
                name="instructions"
                rows="8"
                cols="50"
                autoComplete="off"
                value={instructions}
                onChange={this.handleChange}
            />
            {inputs}
            <button
                type="button"
                onClick={this.handleNewIngredients}
                className="buttons"
                >
                +
                </button>
                
                <div className="recipe-form-line">
                    <label htmlFor="recipe-img-input">Image URL</label>
                    <input 
                        id="recipe-img-input"
                        type="text"
                        placeholder=''
                        name="img"
                        value={img}
                        size={36}
                        autoComplete="off"
                        onChange={this.handleChange} />
                </div>
                <button
                    type="submit"
                    className="buttons"
                    style={{alignSelf: 'flex-end', marginRight: 0}}
                    >
                    Save
                    </button>
                </form>
            </div>
            )
        
    }
}

export default RecipeInput;

