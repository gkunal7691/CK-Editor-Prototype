
export class UploadAdapter 
{
    private fileLoader;
    public editor;
    
    constructor(fileLoader: any, editor: any) 
    {
        
        this.fileLoader = fileLoader;
        this.editor = editor;

    }
  
    public upload(): Promise<any> {
        return this.readFile(this.fileLoader.file);
    }

    readFile(file: File): Promise<any> 
    {
        const editor = this.editor;
        const t = editor.t;

        const imagePromise: Promise<any> = new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader();

            reader.onloadend = (e) => 
            {                          
                editor.model.enqueueChange( () => 
                {
                    
                    editor.model.change( writer => {
                        const imageElement = writer.createElement( 'image', {
                            src: reader.result
                        } );
    
                        // Insert the image in the current selection location.
                        editor.model.insertContent( imageElement, editor.model.document.selection );


                    } );
                });

                return { default: reader.result };
                resolve();
            };
            
            if (file) {
                reader.readAsDataURL(file);
            }
        });
        
        return imagePromise;
    }
    
}

