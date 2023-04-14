function Tetramino(fieldWidth, pos_X, pos_Y, type)
{
    this.fieldWidth = fieldWidth;
    this.type = type;
    this.pos_X = pos_X;
    this.pos_Y = pos_Y;
    this.width = 0;
    this.height = 0;

    this.arrayShape = null;

    this.initialize = function(){

        if(type == 1) // T shape
        {        
            this.height = 3;
            this.width = 3;
            this.arrayShape = Array(this.height);

            for(i = 0; i < this.arrayShape.length; i++)
            {
                this.arrayShape[i] = Array(this.width);
                for(j = 0; j < this.arrayShape[i].length; j++)
                {            
                    if(i == 0 || i == 1 && j == 1)
                        this.arrayShape[i][j] = 1;
                    else
                        this.arrayShape[i][j] = 0;
                }
            }

        }
        else if(type == 2) // -- shape
        {
            this.height = 4;
            this.width = 4;
            this.arrayShape = Array(this.height);

            for(i = 0; i < this.arrayShape.length; i++)
            {
                this.arrayShape[i] = Array(this.width);
                for(j = 0; j < this.arrayShape[i].length; j++)
                {   
                    if(i==2)         
                        this.arrayShape[i][j] = 1;
                    else
                        this.arrayShape[i][j] = 0;
                }
            }
        }
        else if(type == 3) // L shape
        {
            this.height = 3;
            this.width = 3;
            this.arrayShape = Array(this.height);

            for(i = 0; i < this.arrayShape.length; i++)
            {
                this.arrayShape[i] = Array(this.width);
                for(j = 0; j < this.arrayShape[i].length; j++)
                {            
                    if(i == 0 || i == 1 && j == 2)
                        this.arrayShape[i][j] = 1;
                    else
                        this.arrayShape[i][j] = 0;
                }
            }
        }
        
        console.log(this.arrayShape);
    }

    this.shiftDown = function(){
        this.pos_Y += 1;
    }

    this.moveRight = function()
    {
        this.pos_X += 1;
    }

    this.moveLeft = function()
    {
        this.pos_X -= 1;
    }
    
    this.rotateClockWise = function(){
        var newArrayShape = Array(this.height);

        for(i = 0; i < newArrayShape.length; i++)
        {
            newArrayShape[i] = Array(this.width);
            for(j = 0; j < newArrayShape[i].length; j++)
            {            
                newArrayShape[i][j] = this.arrayShape[j][i];
            }
        }

        for(i = 0; i < newArrayShape.length; i++)
        {
            newArrayShape[i] = newArrayShape[i].reverse();
        }
        
        return newArrayShape;
    }

    this.applyNewArrayValues = function(newArray){
        for(i = 0; i < this.arrayShape.length; i++)
        {
            this.arrayShape[i] = Array(this.width);
            for(j = 0; j < this.arrayShape[i].length; j++)
            {            
                this.arrayShape[i][j] = newArray[i][j];
            }
        }
    }

    this.checkRowEmpty = function(rowIdx){
        var empty = true;

        for(i=0; i < this.arrayShape[rowIdx].length; i++)
        {
            if(this.arrayShape[rowIdx][i] == 1)
                empty = false;
        }

        return empty;
    }

    this.checkColumnEmpty = function(columnIdx){
        var empty = true;

        for(i=0; i < this.arrayShape.length; i++)
        {
            if(this.arrayShape[i][columnIdx] == 1)
                empty = false;
        }

        return empty;
    }
}