import { NextResponse } from 'next/server';
const { uploadTemp } = require('../../../../../../server/services/fileService');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ error: 'No files received' }, { status: 400 });
  }
  const uploadedName = await uploadTemp(file);
  if (!uploadedName)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );

  return NextResponse.json({ name: uploadedName }, { status: 201 });
}
