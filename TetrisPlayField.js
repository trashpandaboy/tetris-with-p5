function TetrisPlayField(rowSize, columnSize, offset_X, offset_Y){
    this.rowSize = rowSize;
    this.columnSize = columnSize;
    this.offset_X = offset_X;
    this.offset_Y = offset_Y;

    this.arrayField = null;

    this.initialize = function(){
        this.arrayField = Array(this.rowSize);

        for(i = 0; i < this.arrayField.length; i++)
        {
            this.arrayField[i] = Array(this.columnSize);
            for(j = 0; j < this.arrayField[i].length; j++)
            {            
                this.arrayField[i][j] = 1;
            }
        }

        console.log(this.arrayField);
    }
    
    this.draw = function(){

        strokeWeight(1);
        for(i = 0; i < this.arrayField.length; i++)
        {
            for(j = 0; j < this.arrayField[i].length; j++)
            {
                rect(j * 40 + offset_X + 4,
                    i * 40 + offset_Y,
                    38,
                    38);
            }
        }
    }
  }

