function TetrisPlayField(rowSize, columnSize, offset_X, offset_Y){
    this.rowSize = rowSize;
    this.columnSize = columnSize;
    this.offset_X = offset_X;
    this.offset_Y = offset_Y;

    this.arrayField = null;

    this.tetramino = null;

    this.initialize = function(){
        
        this.arrayField = Array(this.rowSize);

        for(i = 0; i < this.arrayField.length; i++)
        {
            this.arrayField[i] = Array(this.columnSize);
            for(j = 0; j < this.arrayField[i].length; j++)
            {            
                this.arrayField[i][j] = 0;
            }
        }

        this.spawnTetramino();

        console.log(this.arrayField);
    }

    this.spawnTetramino = function()
    {
        this.tetramino = new Tetramino(this.columnSize, 4,0, getRandomInt(3));
        this.tetramino.initialize();
    }
    
    this.draw = function(){

        strokeWeight(0);
        for(i = 0; i < this.arrayField.length; i++)
        {
            for(j = 0; j < this.arrayField[i].length; j++)
            {
                if (this.arrayField[i][j] == 1)
                {
                    rect(j * 40 + offset_X,
                        i * 40 + offset_Y,
                        38,
                        38);
                }
            }
        }
        
        for(i = 0; i < this.tetramino.arrayShape.length;i++ )
        {
            for(j = 0; j < this.tetramino.arrayShape[i].length;j++ )
            {                    
                if(this.tetramino.arrayShape[i][j] == 1)
                {
                    rect(
                        ((this.tetramino.pos_X + j) * 40) + offset_X,
                        ((this.tetramino.pos_Y + i) * 40) + offset_Y,
                        38, 38);       
                    }   
                }
        }
    }

    this.checkPerformStepCondition = function()
    {
        var canPerform = true;
        
        //idxLineToCheck is the index row of the tetramino
        //starts from the last to the first
        for(idxLineToCheck = this.tetramino.arrayShape.length - 1; idxLineToCheck >= 0; idxLineToCheck--)
        {
            //row is the index line of the play field
            var row = idxLineToCheck + this.tetramino.pos_Y + 1;
            
            if(row < this.arrayField.length)
            {
                for(i = 0; i < this.tetramino.arrayShape[idxLineToCheck].length - 1; i++)
                {
                    if(this.tetramino.arrayShape[idxLineToCheck][i] == 1 && this.arrayField[row][this.tetramino.pos_X + i] == 1)
                    {   
                        canPerform = false;
                    }
                }
            }
            else if(row == this.rowSize)
            {
                if(!this.tetramino.checkRowEmpty(idxLineToCheck))
                    canPerform = false;
            }
        }
        
        if(!canPerform)
        {   
            this.persistTetramino();
            this.spawnTetramino();
        }

        return canPerform;
    }

    this.checkPerformRotation = function(rotatedShapeArray){
        var canPerform = true;
        
        //idxLineToCheck is the index row of the tetramino
        //starts from the last to the first
        for(idxLineToCheck = rotatedShapeArray.length - 1; idxLineToCheck >= 0; idxLineToCheck--)
        {
            // //row is the index line of the play field
            // var row = idxLineToCheck + this.tetramino.pos_Y;
            
            // if(row < this.arrayField.length)
            // {
            //     for(i = 0; i < this.tetramino.arrayShape[idxLineToCheck].length - 1; i++)
            //     {
            //         if(this.tetramino.arrayShape[idxLineToCheck][i] == 1 && this.arrayField[row][this.tetramino.pos_X + i] == 1)
            //         {   
            //             canPerform = false;
            //         }
            //     }
            // }
            // else if(row == this.rowSize)
            // {
            //     if(!this.tetramino.checkRowNonEmpty(idxLineToCheck))
            //         canPerform = false;
            // }
        }

        return canPerform;
    }

    this.persistTetramino = function()
    {
        for(i = 0; i < this.tetramino.arrayShape.length;i++ )
        {
            for(j = 0; j < this.tetramino.arrayShape[i].length;j++ )
            {   
                if(this.tetramino.arrayShape[i][j]==1)
                {
                    this.arrayField[this.tetramino.pos_Y + i][this.tetramino.pos_X + j] = 1;
                }
            }   
        }

        console.log(this.arrayField);
    }

    this.step = function()
    {
        if(this.checkPerformStepCondition())
        {
            this.tetramino.shiftDown();
        }
    }

    this.moveRight = function()
    {
        this.tetramino.moveRight();
    }

    this.moveLeft = function(){
        if(this.tetramino.pos_X > 0 || this.tetramino.pos_X <= 0 && this.tetramino.checkColumnEmpty(Math.abs(this.tetramino.pos_X)))
            this.tetramino.moveLeft();
    }

    this.rotate = function(){
        var rotatedShape = this.tetramino.rotateClockWise();

        if(this.checkPerformRotation(rotatedShape))
        {
            rotationPerformed();
            this.tetramino.applyNewArrayValues(rotatedShape);
        }
    }
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
