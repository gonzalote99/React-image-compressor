import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import imageCompression from 'browser-image-compression';

function ImageCompressor() {
  const [uploadImage, setUploadImage] = useState(false);
  const [clicked, setClicked] = useState('');
  const [compressedLink, setCompressedLink] = useState('http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png');
  const [imageDetails, setImageDetails] = useState({
    originalImage: '',
    originalLink: '',
    outputFielName: ''
  });

  function handleClick(e) {
    const [imageFile] = e.target.files;

    setUploadImage(true);
    setImageDetails({
      originalImage: imageFile,
      originalLink: URL.createObjectURL(imageFile),
      outputFielName: imageFile.name
      
    });
  }

  async function handleCompress(e) {
    e.preventDefault();

    const options = {
      maxSixeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if(options.maxSixeMB >= imageDetails.originalImage.size / 1024) {
      alert('image to small')
      return 0;
    }

    const output = await imageCompression(imageDetails.originalImage, options);
    const downloadLink = URL.createObjectURL(output);
    setCompressedLink(downloadLink)
    setClicked(true);
    return 1;
    
  }

  

  return(
    <div className='m-5'>
      <div className='text-light text-center'>
      <h1>three steps</h1>
        <h3>1. upload image</h3>
        <h3>2. click in compress</h3>    
        <h3>3. dowload compress image</h3>
        

        
      </div>
      <div className='row mt-5'>
      <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
        {uploadImage ? (
       <Card.Img 
        className='ht' variant='top' src={imageDetails.originalLink}
         ></Card.Img>
        ) : (
      <Card.Img
        className='ht'
        variant='top'
        src='http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png'
        ></Card.Img>
        )}
        <div className='d-flex justify-content-center'>
        <input
          type='file'
          accept='/*'
          className='mt-2 btn btn-dark w-75'
          onChange={handleClick}
          />
        </div>
      </div>
        <div className='col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline'>
        <br />
          {imageDetails.outputFielName && (
           <button
             type='button'
             className='btn btn-dark'
             onClick={handleCompress}
             >compress</button>
          )} 
        </div>
        <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3'>
        <Card.Img variant='top' src={compressedLink} ></Card.Img>
          {clicked && (
      <div className='d-flex justify-content-center'>
      <a
        href={compressedLink}
        download={imageDetails.outputFielName}
        className='mt-2 btn btn-dark w-75'
        >download</a>
      </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ImageCompressor;