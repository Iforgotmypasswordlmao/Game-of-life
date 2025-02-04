

const canvas = document.getElementById('grid');
const context = canvas.getContext('2d');
const greenFlag = document.getElementById('start');
const redFlag = document.getElementById('stop');
const greenFlagImage = document.getElementById('green');

const dimensions = {columns: 120, rows: 60};
let intervalId;

let gameBoard = [];

function initializeBoard()
{
    const dummyRow = [];

    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, 1200, 600);

    
    for (let i = 0; i < dimensions['columns']; i++)
    {
        dummyRow.push(0);
    }

    for (let j = 0; j < dimensions['rows']; j++)
    {
        gameBoard.push([...dummyRow]);
    };
    
};

function drawSquare(x, y, fill)
{   
    context.fillStyle = fill;
    context.fillRect( x*10, y*10, 10, 10 );
};

function countSquares(x, y)
{
    let neighbourCounter = 0;

    for (let i = -1; i < 2; i ++)
    {
        for (let j = -1; j < 2; j ++)
        {
            if (i == 0 && j == 0)
            {
                continue;
            }
            else if ((x + i < 0) || (x + i >= 60) || (y + j < 0) || (y + j >= 120))
            {
                continue
            }
            else
            {
                neighbourCounter += gameBoard[x + i][y + j];
            };
        };
    };

    if (gameBoard[x][y] == 1)
    {

        if ( (2 <= neighbourCounter) && (neighbourCounter <= 3) )
        {
            return 1; // rule 2;
        }
        else
        {
            return 0; // rule 1 and 3;
        };
    }
    else if ( neighbourCounter == 3 )
    {
        return 1; // rule 4;
    }
    else
    {
        return 0;
    };
};

function updateBoard()
{
    const nextGameState = [];

    context.clearRect( 0, 0, 1200, 600 );
    context.fillStyle = '#FFFFFF';
    context.fillRect( 0, 0, 1200, 600 );
    
    for (let m = 0; m < 60; m++)
    {
        let dummyRowdummy = [];
        
        for (let n = 0; n < 120; n++)
        {
            dummyRowdummy.push( countSquares(m, n) );

            if (gameBoard[m][n] == 1)
            {
                drawSquare( n, m, '#000000' );
            }
        };

        nextGameState.push( [...dummyRowdummy] );
    };
    gameBoard = [...nextGameState];

};

function clickSquare(x, y)
{
    const xPos = Math.floor( x/10 );
    const yPos = Math.floor( y/10 );

    if ( gameBoard[yPos][xPos] == 1 )
    {
        gameBoard[yPos][xPos] = 0;
        drawSquare( xPos, yPos, '#FFFFFF' );
    }
    else
    {
        gameBoard[yPos][xPos] = 1;
        drawSquare( xPos, yPos, '#000000' );
    };

};

function main()
{
    initializeBoard();

    canvas.addEventListener( 'click', (event) => {
        clickSquare(event.offsetX, event.offsetY);
    });

    greenFlag.addEventListener( 'click', (event) => {
        greenFlag.disabled = true;
        greenFlagImage.style.opacity = 0.5;
        intervalId = setInterval(updateBoard, 250);
    });

    redFlag.addEventListener( 'click', (event) =>{
        greenFlag.disabled = false;
        greenFlagImage.style.opacity = 1;
        clearInterval(intervalId);
    });
};

window.onload = () => {
    main();
};